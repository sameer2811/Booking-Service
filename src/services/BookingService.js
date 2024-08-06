const axios = require('axios');
const serverConfig = require('../config/serverConfig');
const {
    AppError
} = require('../utils/errors');
const {
    StatusCodes
} = require('http-status-codes');
const db = require('../models');
class BookingService {

    constructor(repository) {
        this.repository = repository;
    }

    async createBooking(data) {
        const transaction = await db.sequelize.transaction();
        try {
            let flightDetails = await axios.get(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`);
            const flightPayload = flightDetails.data.data;
            let totalBillingAmount = parseInt(data.seats) * parseFloat(flightPayload.price);
            if (parseInt(flightPayload.totalSeats) >= parseInt(data.seats)) {
                // Make a booking entry in the booking table with booking initiated.
                await this.repository.createBooking({
                    flightId: data.flightId,
                    userId: data.userId,
                    totalCost: totalBillingAmount,
                    noOfseats: data.seats
                }, transaction)
                // Make a call to the flight service to update the seats
                await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}/seats`, {
                    seats: parseInt(data.seats),
                    dec: true
                });
            } else {
                throw "Not enough number of seats ";
            }
            await transaction.commit();
            return {
                flightId: data.flightId,
                userId: data.userId,
                totalCost: totalBillingAmount,
                noOfseats: data.seats
            };
        } catch (error) {
            await transaction.rollback();
            return new AppError(StatusCodes.BAD_REQUEST, error);
        }
    }
};


module.exports = BookingService;