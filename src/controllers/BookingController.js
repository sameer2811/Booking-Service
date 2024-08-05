const {
    StatusCodes
} = require("http-status-codes");
const {
    BookingService
} = require("../services");
const {
    successResponse,
    errorResponse
} = require("../utils/common");

const bookingService = new BookingService();

async function createBookingController(req, res) {
    try {
        let data = {
            flightId: req.body.flightId,
            seats: req.body.seats
        };
        const response = await bookingService.createBooking(data);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}

module.exports = createBookingController;