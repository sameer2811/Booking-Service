const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./config/serverConfig');
const apiRouter = require('./routes');

// Initializing the express app.
const app = express();

// setting up the bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api', apiRouter);

// Server startup definitions.
async function startServer() {
    app.listen(serverConfig.PORT, async function () {
        console.log(`Server has Started Listening at PORT ${serverConfig.PORT}`);
    })
}

// calling the server.
startServer();
