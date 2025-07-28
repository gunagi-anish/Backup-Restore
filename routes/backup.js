const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const multer = require("multer");
const path = require("path");
const authenticateAdmin = require("../middleware/auth");
require("dotenv").config();

const BACKUP_FOLDER = path.join(__dirname, "..", "backups");
const upload = multer({ dest: BACKUP_FOLDER });

// Manual backup
router.get("/backup", authenticateAdmin, (req, res) => {
  const fileName = `backup_${Date.now()}.sql`;
  const filePath = path.join(BACKUP_FOLDER, fileName);
  const mysqldumpPath = `"C:\\xampp\\mysql\\bin\\mysqldump.exe"`;
  const command = `${mysqldumpPath} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > "${filePath}"`;

  exec(command, (err) => {
    if (err) {
      console.error("Backup error:", err);
      return res.status(500).send("Backup failed.");
    }
    res.send(`Backup saved: ${fileName}`);
  });
});

// Restore from uploaded file
router.post("/restore", authenticateAdmin, upload.single("backupFile"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  const filePath = req.file.path;
  const mysqlPath = `"C:\\xampp\\mysql\\bin\\mysql.exe"`;
  const command = `${mysqlPath} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} < "${filePath}"`;

  exec(command, (err) => {
    if (err) {
      console.error("Restore error:", err);
      return res.status(500).send("Restore failed.");
    }
    res.send("Database restored.");
  });
});

module.exports = router;