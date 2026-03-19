const express = require("express");

const router = express.Router();

router.use("/bookings", require("./booking-routes"));

module.exports = router;
