const mongoose = require('mongoose');

module.exports.connectToMongo = () => {
    const URI = process.env.MONGODB_URI;
    mongoose.connect(URI)
    const db = mongoose.connection;


    db.on('error', function (err) {
        console.error(err);
    })

    db.once('open', () => {
        console.log('Connected to mongodb ')
    })
}

module.exports.connectToRedis = () => {

}