const { StatusCodes } = require("http-status-codes");

const hello = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "API is live",
    error: {},
    data: {},
  });
};

module.exports = { hello };
