const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    usage: {
        type: String,
        required: true
    },
    traffic: {
        type: String,
        required: true
    },
    dataTransfer: {
        type: String,
        required: true
    },
    coverage: {
        type: String,
        required: true
    },
    timeLapsed: {
        type: String,
        required: true
    },
    populationShare: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Analytics', analyticsSchema);
