const dotenv = require("dotenv");

dotenv.config();

// console.log("env things=> ",process.env.PORT)

module.exports = { PORT: process.env.PORT };
