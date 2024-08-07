const axios = require('axios');
const serverConfig = require('../config/serverConfig');
const {
    AppError
} = require('../utils/errors');
const {
    StatusCodes
} = require('http-status-codes');
const db = require('../models');
const {
    BOOKING_STATUS
} = require('../utils/common/enums');
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

    async makePaymentForBooking(bookingData) {
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await this.repository.getBooking(bookingData.bookingId, transaction);

            if (!bookingDetails) {
                return new AppError(StatusCodes.BAD_REQUEST, `No Booking details found for this id`);
            }

            if (bookingDetails.status == BOOKING_STATUS.CANCELLED || bookingDetails.status == BOOKING_STATUS.BOOKED) {
                return new AppError(StatusCodes.BAD_REQUEST, `Booking is already in a cancelled state or booked state`);
            }
            const currentTime = new Date();
            const bookingTime = new Date(bookingDetails.createdAt);

            // check price
            if (bookingData.price != bookingDetails.totalCost) {
                return new AppError(StatusCodes.BAD_REQUEST, `price does not match for the booking`);
            }
            // check userId
            if (bookingData.userId != bookingDetails.userId) {
                return new AppError(StatusCodes.BAD_REQUEST, `UserId does not match for the booking`);
            }

            //  check time is more then 5 min (convert to millisec)
            if (currentTime - bookingTime >= 300000) {
                await this.cancelBooking(bookingData.bookingId);
                return new AppError(StatusCodes.BAD_REQUEST, `Booking has expired for the time Being of booking id ${bookingData.bookingId}`);
            }
            const response = await this.repository.updateBooking(bookingData.bookingId, {
                status: BOOKING_STATUS.BOOKED,
            }, transaction);

            await transaction.commit();
            return response;
        } catch (error) {
            await transaction.rollback();
        }
    }

    async cancelBooking(bookingId) {
        const transaction = await db.sequelize.transaction();
        try {
            if (bookingId == null || bookingId == undefined || bookingId == "") {
                return;
            }
            const bookingDetails = await this.repository.getBooking(bookingId, transaction);
            if (bookingDetails.status === BOOKING_STATUS.CANCELLED) {
                return;
            }
            // release the number of seats
            await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flights/${bookingDetails.flightId}/seats`, {
                seats: parseInt(bookingDetails.noOfseats),
                dec: false
            });
            // update the status in Booking table 
            await this.repository.updateBooking(bookingId, {
                status: BOOKING_STATUS.CANCELLED
            }, transaction);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
        }
    }
};


module.exports = BookingService;