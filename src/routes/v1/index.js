const express = require('express');
const pingRouter = require('./pingRoutes');
const bookingRouter = require('./bookingRoutes');
const v1Router = express.Router();

// Ping Router.
v1Router.use('/ping', pingRouter);
v1Router.use('/booking', bookingRouter);

module.exports = v1Router;