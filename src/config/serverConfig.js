const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SERVICE_URL : 'http://localHost:3001'
};