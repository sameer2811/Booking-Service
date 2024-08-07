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

    async updateBooking(key, updateStatus, transaction) {
        const response = await Booking.update(updateStatus, {
            where: {
                id: key
            }
        }, {
            transaction: transaction
        });
        return response;
    }

    async getBooking(bookingId, transaction) {
        const response = await Booking.findByPk(bookingId, {
            transaction: transaction
        });
        return response;
    }
}

module.exports = BookingRepository;