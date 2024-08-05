const express = require('express');
const checkBookingValidation = require('../../validators/checkBookingValidator');
const {
    createBookingController
} = require('../../controllers/');

const bookingRouter = express.Router();


bookingRouter.post('/', checkBookingValidation, createBookingController);


module.exports = bookingRouter;