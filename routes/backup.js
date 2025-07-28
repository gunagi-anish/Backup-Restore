// routes/backup.js
const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateAdmin = require("../middleware/auth");
const mysqldump = require("mysqldump");
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

    res.send(`Backup saved: ${fileName}`);
  } catch (err) {
    console.error("Backup failed:", err);
    res.status(500).send("Backup failed.");
  }
});

const mysql = require("mysql2");

router.post("/restore", authenticateAdmin, upload.single("backupFile"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const sql = fs.readFileSync(req.file.path, "utf8");

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true, // Important for restoring .sql files
  });

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Restore failed:", err);
      return res.status(500).send("Restore failed.");
    }
    res.send("Database restored.");
  });
});

module.exports = router;