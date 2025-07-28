const jwt = require("jsonwebtoken");
const token = jwt.sign({ role: "admin" }, "Anish2004", { expiresIn: "1h" });
console.log(token);
