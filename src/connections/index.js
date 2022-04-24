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
    const redis = require('redis');

    const redisClient = redis.createClient({
        url: process.env.REDIS,
        password: process.env.REDIS_PASSWORD,
        legacyMode:true
    })

    redisClient.on('error', function (err) {
        console.error(err);
    })
    redisClient.on('connect', function (err) {
        console.log("Connected to Redis");
    })
    redisClient.connect() ;
    return redisClient ;
}