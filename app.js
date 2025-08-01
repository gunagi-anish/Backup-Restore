const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("./scheduler/backupScheduler"); // starts cron job

const bookRoutes = require("./routes/books");
const backupRoutes = require("./routes/backup");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api", backupRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
