const cron = require("node-cron");
const mysqldump = require("mysqldump");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const BACKUP_FOLDER = path.join(__dirname, "..", "backups");
if (!fs.existsSync(BACKUP_FOLDER)) fs.mkdirSync(BACKUP_FOLDER);

// Utility: Delete .sql files older than 7 days
function cleanupOldBackups() {
  const files = fs.readdirSync(BACKUP_FOLDER);
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  files.forEach(file => {
    if (file.endsWith(".sql")) {
      const filePath = path.join(BACKUP_FOLDER, file);
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs;

      if (age > sevenDays) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted old backup: ${file}`);
      }
    }
  });
}

// Schedule: every day at 2:00 AM
cron.schedule("*/15 * * * *", async () => {
  const fileName = `auto_backup_${Date.now()}.sql`;
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

    console.log(`[Auto Backup] Created: ${fileName}`);

    // Cleanup after backup
    cleanupOldBackups();
  } catch (err) {
    console.error("[Auto Backup] Failed:", err.message || err);
  }
});
