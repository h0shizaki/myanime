const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
    {
        collection: "users"
    }
)

var Users = module.exports = mongoose.model('Users', userSchema)

module.exports.getUser = (filter, cb) => {
    Users.findOne(filter, cb);
}



module.exports.addUser = (data, cb) => {
    Users.create(data, cb);
}