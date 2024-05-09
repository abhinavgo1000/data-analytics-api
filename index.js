const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const analyticsRoutes = require('./routes/analyticsroutes');

const MONGO_URL = 'mongodb+srv://abhinavgl:pVAzCVdC9CBoCksv@cluster0.atsxdhb.mongodb.net/analytics?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = config.port;

app.use(cors());

app.use('/analytics', analyticsRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({message: message});
});

mongoose.connect(
    MONGO_URL
)
.then(() => {
    server.listen(port, () => {
        console.log(`App is running and listening on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});
