const mongoose = require('mongoose');

const seriesShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    premiered: {
        type: String,
        required: true
    },
    source: {
        type: String
    },
    studio: {
        type: String,
        required: true
    }

}, {
    collection: 'series'
})

var Series = module.exports = mongoose.model('Series', seriesShcema);

module.exports.getSeries = (callback) => {
    Series.find(callback);
}

module.exports.addSeries = (data, callback) => {
    Series.create(data, callback);
}
