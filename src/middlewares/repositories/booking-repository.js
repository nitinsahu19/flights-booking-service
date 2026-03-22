const { Booking } = require("../../models");
const CrudRepository = require("./crud-repository");

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }

  async updateBooking(data, transaction) {
    const response = await Booking.update(
      { status: data.status },
      {
        where: { id: data.bookingId },
      },
      { transaction: transaction },
    );
    return response;
  }
}
module.exports = BookingRepository;
