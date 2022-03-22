const mongoose = require('mongoose');

const charactersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    voiceactor: {
        type: String
    }

}, {
    collection: 'characters'
})

var Character = module.exports = mongoose.model('Characters', charactersSchema);

module.exports.getCharacterById = (filter , cb) => {
    Character.findOne(filter , cb)
}

module.exports.addCharacter = (data , cb) => {
    Character.create(data , cb) ;
}

module.exports.deleteCharacter = (id , cb) => {
    Character.findByIdAndRemove(id, cb);
}

