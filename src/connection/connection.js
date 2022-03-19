const mongoose = require('mongoose')

module.exports.connect = () => {
    const URI = process.env.MONGODB_URI;
    mongoose.connect(URI)
    var db = mongoose.connection;

    db.on('error', function (err) {
        console.log(err);
    });

    db.once('open', function () {
        console.log('MongoDB connected!')
    });
};