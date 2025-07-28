const jwt = require("jsonwebtoken");
const token = jwt.sign({ role: "admin" }, "your_secret_key", { expiresIn: "1h" });
console.log(token);
