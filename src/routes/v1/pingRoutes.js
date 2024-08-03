const express = require('express');

// Putting all the require things here.
const {
    pingCheckController
} = require('../../controllers/pingController');


// Ping Router
const pingRouter = express.Router();


// Routers ending with the suffix /ping till the path constructed.
pingRouter.get('/', pingCheckController)

module.exports = pingRouter;
