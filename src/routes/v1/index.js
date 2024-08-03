const express = require('express');
const pingRouter = require('./pingRoutes');
const v1Router = express.Router();

// Ping Router.
v1Router.use('/ping', pingRouter);

module.exports = v1Router;