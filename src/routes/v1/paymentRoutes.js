const express = require('express');
const {
    createPaymentController
} = require('../../controllers/');
const checkPaymentValidation = require('../../validators/checkPaymentValidation');

const paymentRouter = express.Router();


paymentRouter.post('/', checkPaymentValidation, createPaymentController);


module.exports = paymentRouter;