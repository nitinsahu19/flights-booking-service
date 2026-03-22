const { ServerConfig } = require("../config");
const BookingRepository = require("../middlewares/repositories/booking-repository");
const axios = require("axios");
const db = require("../models");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, PENDING } = Enums.BOOKING_STATUS;

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

const createPayment = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(data.bookingId);

    if (bookingDetails.status === CANCELLED) {
      throw new AppError(
        "Booking session got expired.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 300000) {
      console.log("this block is running");
      await bookingRepository.updateBooking(
        { status: CANCELLED, bookingId: data.bookingId },
        { transaction: transaction },
      );

      throw new AppError(
        "Booking session got expired.",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (parseInt(data.amount) !== bookingDetails.totalCost) {
      throw new AppError(
        "Amount must be valid for booking",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (parseInt(data.userId) !== bookingDetails.userId) {
      throw new AppError(
        "User is not valid for booking",
        StatusCodes.FORBIDDEN,
      );
    }

    await bookingRepository.updateBooking(
      {
        bookingId: data.bookingId,
        status: BOOKED,
      },
      transaction,
    );

    await transaction.commit();

    const bookedFlight = await bookingRepository.get(data.bookingId);

    return bookedFlight;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  }
};

module.exports = { createBooking, createPayment };
