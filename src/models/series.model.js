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

})

module.exports = mongoose.model('Series', seriesShcema) ; 