const { PORT } = require("./config");
const express = require("express");

const app = express();

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
