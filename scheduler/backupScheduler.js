const cron = require("node-cron");
const mysqldump = require("mysqldump");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const BACKUP_FOLDER = path.join(__dirname, "..", "backups");
const LOG_FILE = path.join(__dirname, "..", "logs", "backup.log");

if (!fs.existsSync(BACKUP_FOLDER)) fs.mkdirSync(BACKUP_FOLDER);
if (!fs.existsSync(path.dirname(LOG_FILE))) fs.mkdirSync(path.dirname(LOG_FILE));

function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, entry);
}

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
        log(`Deleted old backup: ${file}`);
      }
    }
  });
}

// Schedule: every 15 minutes
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

    log(`[Auto Backup] Created: ${fileName}`);
    cleanupOldBackups();
  } catch (err) {
    log(`[Auto Backup] Failed: ${err.message || err}`);
  }
});
