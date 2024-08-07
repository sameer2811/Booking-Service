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
const {
    BookingRepository
} = require("../repositories");

const bookingService = new BookingService(new BookingRepository());

async function createPaymentController(req, res) {
    try {
        let data = {
            bookingId: req.body.bookingId,
            price: req.body.price,
            userId: req.body.userId
        };
        const response = await bookingService.makePaymentForBooking(data);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}

module.exports = createPaymentController;