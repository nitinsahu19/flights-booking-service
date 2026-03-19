const { ServerConfig } = require("../config");
const BookingRepository = require("../middlewares/repositories/booking-repository");
const axios = require("axios");
const db = require("../models");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const bookingRepository = new BookingRepository();

const createBooking = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`,
    );

    const flightData = flight.data.data;

    if (parseInt(data.noOfSeats) > flightData.totalSeats) {
      throw new AppError(
        "Not enough seats are available for booking",
        StatusCodes.BAD_REQUEST,
      );
    }

    const totalBillingAmount = parseInt(data.noOfSeats) * flightData.price;

    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const bookedFlight = await bookingRepository.createBooking(
      bookingPayload,
      transaction,
    );

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      { seats: data.noOfSeats },
    );

    await transaction.commit();
    return bookedFlight;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  }
};

module.exports = { createBooking };
