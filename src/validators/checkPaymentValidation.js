const {
    StatusCodes
} = require("http-status-codes");
const {
    errorResponse
} = require("../utils/common/");

async function checkPaymentValidation(req, res, next) {
    if (!req.body.bookingId) {
        errorResponse.description = 'BookingId property is not defined properly.';
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.price) {
        errorResponse.description = 'price property is not defined properly.';
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.userId) {
        errorResponse.description = 'userId property is not defined properly.';
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

module.exports = checkPaymentValidation;