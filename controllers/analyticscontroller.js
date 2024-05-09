const Analytics = require('../models/analytics');

exports.fetchData = (req, res, next) => {
    Analytics.find()
    .then((analytics) => {
        res.status(200).send(analytics);
    })
    .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.enterData = (req, res, next) => {
    const usage = req.body.usage;
    const traffic = req.body.traffic;
    const dataTransfer = req.body.dataTransfer;
    const coverage = req.body.coverage
    const timeLapsed = req.body.timeLapsed;
    const populationShare = req.body.populationShare;
    const analyticsData = new Analytics({
        usage: usage,
        traffic: traffic,
        dataTransfer: dataTransfer,
        coverage: coverage,
        timeLapsed: timeLapsed,
        populationShare: populationShare
    });
    analyticsData.save()
    .then((result) => {
        res.status(201).json({
            message: 'Data generated successfully',
            data: result
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
