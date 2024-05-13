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

exports.fetchDataById = (req, res, next) => {
    const dataId = req.params.dataId;
    Analytics.findById(dataId)
    .then((data) => {
        if (!data) {
            const error = new Error('Could not find the data');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send(data);
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateData = (req, res, next) => {
    const dataId = req.params.dataId;
    const usage = req.body.usage;
    const traffic = req.body.traffic;
    const dataTransfer = req.body.dataTransfer;
    const coverage = req.body.coverage
    const timeLapsed = req.body.timeLapsed;
    const populationShare = req.body.populationShare;
    Analytics.findById(dataId)
    .then((data) => {
        if (!data) {
            const error = new Error('Could not find the data');
            error.statusCode = 404;
            throw error;
        }
        data.usage = usage;
        data.traffic = traffic;
        data.dataTransfer = dataTransfer;
        data.coverage = coverage;
        data.timeLapsed = timeLapsed;
        data.populationShare = populationShare;
        return data.save();
    })
    .then((data) => {
        res.status(200).json({
            message: 'Data updated successfully',
            data: data
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteData = (req, res, next) => {
    const dataId = req.params.dataId;
    Analytics.findById(dataId)
    .then((data) => {
        if (!data) {
            const error = new Error('Could not find the data');
            error.statusCode = 404;
            throw error;
        }
        return Analytics.findByIdAndDelete(dataId);
    })
    .then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Data deleted',
            data: data
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
