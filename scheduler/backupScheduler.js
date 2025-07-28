// scheduler/backupScheduler.js
const cron = require("node-cron");
const mysqldump = require("mysqldump");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const BACKUP_FOLDER = path.join(__dirname, "..", "backups");
if (!fs.existsSync(BACKUP_FOLDER)) fs.mkdirSync(BACKUP_FOLDER);

// Schedule: every half an hour
cron.schedule("*/30 * * * *", async () => {
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

    console.log(`"[Auto Backup] Created: ${fileName}`);
  } catch (err) {
    console.error("[Auto Backup] Failed:", err.message || err);
  }
});
