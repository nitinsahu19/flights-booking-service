const express = require("express");
const { HelloController } = require("../../controllers");

const router = express.Router();

router.get("/hello", HelloController.hello);

module.exports = router;
