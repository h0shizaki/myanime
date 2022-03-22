const mongoose = require('mongoose');

const seriesShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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
    },
    characters: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    }

}, {
    collection: 'series'
})

var Series = module.exports = mongoose.model('Series', seriesShcema);

module.exports.getSeries = (cb) => {
    Series.find(cb);
}

module.exports.getOneSeries = (filter, cb) => {
    Series.findOne(filter, cb);
}

module.exports.addSeries = (data, cb) => {
    Series.create(data, cb);
}

module.exports.upadteSeries = (id, data, cb) => {
    Series.findByIdAndUpdate(id, { $set: data }, cb)
}

module.exports.deleteSeries = (id, cb) => {
    Series.findByIdAndRemove(id, cb);
}

module.exports.updateCharacter = (id, characterId, cb) => {
    Series.findByIdAndUpdate(id, {
        $push: {
            characters: new mongoose.Types.ObjectId(characterId)
        }
    }, cb)
}
