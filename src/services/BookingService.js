const axios = require('axios');
const serverConfig = require('../config/serverConfig');
const {
    AppError
} = require('../utils/errors');
const {
    StatusCodes
} = require('http-status-codes');
class BookingService {

    constructor() {}

    async createBooking(data) {
        try {
            console.log(data);
            let flightDetails = await axios.get(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`);
            console.log(flightDetails.data.data);
            return flightDetails.data.data;
        } catch (error) {
            console.log(error);
            return new AppError(StatusCodes.BAD_REQUEST, "Not able to fetch the bookings");
        }
    }
};


module.exports = BookingService;