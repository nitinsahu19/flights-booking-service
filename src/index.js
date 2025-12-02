const { PORT } = require("./config");
const express = require("express");
const apiRoutes = require('./routes');

const app = express();

app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
