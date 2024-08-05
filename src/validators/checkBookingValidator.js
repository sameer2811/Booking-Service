const {
    StatusCodes
} = require("http-status-codes");
const {
    errorResponse
} = require("../utils/common/");

async function checkBookingValidation(req, res, next) {
    if (!req.body.flightId) {
        errorResponse.description = 'flightId property is not defined properly.';
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.seats) {
        errorResponse.description = 'seats property is not defined properly.';
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

module.exports = checkBookingValidation;