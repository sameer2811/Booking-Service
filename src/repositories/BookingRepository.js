const CrudRepository = require("./crudRepository");
const {
    Booking
} = require('./../models/')
class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(bookingPayload, transaction) {
        await Booking.create(bookingPayload, {
            transaction: transaction
        });
    }

    async updateBooking(bookingPayload, transaction) {
        await Booking.create(bookingPayload, {
            transaction: transaction
        });
    }

    async getBooking(bookingPayload, transaction) {
        await Booking.create(bookingPayload, {
            transaction: transaction
        });
    }
}

module.exports = BookingRepository;