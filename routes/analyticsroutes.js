const express = require('express');

const router = express.Router();

const analyticsController = require('../controllers/analyticscontroller');

router.get('/fetch-data', analyticsController.fetchData);

router.post('/enter-data', analyticsController.enterData);

router.get('/fetch-data/:dataId', analyticsController.fetchDataById);

router.put('/update-data/:dataId', analyticsController.updateData);

router.delete('/delete-data/:dataId', analyticsController.deleteData);

module.exports = router;
