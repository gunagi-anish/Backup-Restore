// routes/backup.js
const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateAdmin = require("../middleware/auth");
const mysqldump = require("mysqldump");
const mysql = require("mysql2");
require("dotenv").config();

const BACKUP_FOLDER = path.join(__dirname, "..", "backups");
if (!fs.existsSync(BACKUP_FOLDER)) fs.mkdirSync(BACKUP_FOLDER);
const upload = multer({ dest: BACKUP_FOLDER });

// Backup using mysqldump NPM package
router.get("/backup", authenticateAdmin, async (req, res) => {
  const fileName = `backup_${Date.now()}.sql`;
  const filePath = path.join(BACKUP_FOLDER, fileName);

  try {
    await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: filePath,
    });

    res.download(filePath);
  } catch (err) {
    console.error("Backup failed:", err);
    res.status(500).send("Backup failed.");
  }
});

// Restore from uploaded file using mysql2
router.post("/restore", authenticateAdmin, upload.single("backupFile"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  let sql = fs.readFileSync(req.file.path, "utf8");

  // Normalize line endings and strip comments
  sql = sql.replace(/\r\n/g, "\n").trim();
  sql = sql
    .split("\n")
    .filter(line => !line.startsWith("/*!") && !line.startsWith("--") && !line.startsWith("#"))
    .join("\n");

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Connection failed:", err.message);
      return res.status(500).json({ error: "Connection failed", message: err.message });
    }

    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Restore failed:", err.message || err.sqlMessage || err);
        return res.status(500).json({ error: "Restore failed", message: err.message || err.sqlMessage || err });
      }

      res.send("Database restored.");
    });
  });
});

module.exports = router;