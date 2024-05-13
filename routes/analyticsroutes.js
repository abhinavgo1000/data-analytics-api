const express = require('express');

const router = express.Router();

const analyticsController = require('../controllers/analyticscontroller');

router.get('/fetch-data', analyticsController.fetchData);

router.post('/enter-data', analyticsController.enterData);

module.exports = router;
