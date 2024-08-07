const express = require('express');
const pingRouter = require('./pingRoutes');
const bookingRouter = require('./bookingRoutes');
const paymentRouter = require('./paymentRoutes');
const v1Router = express.Router();

// Ping Router.
v1Router.use('/ping', pingRouter);
v1Router.use('/booking', bookingRouter);
v1Router.use('/payments',paymentRouter);

module.exports = v1Router;