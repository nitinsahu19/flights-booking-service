const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createBooking = async (req, res) => {
  try {
    const { noOfSeats, flightId, userId } = req.body;
    const bookedFlight = await BookingService.createBooking({
      noOfSeats,
      flightId,
      userId,
    });
    SuccessResponse.message = "Successfully completed the request";
    SuccessResponse.data = bookedFlight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

module.exports = { createBooking };
