require('dotenv').config()
const path = require('path')
const express = require('express');
const app = express();
const session = require('express-session');
const connectRedis = require('connect-redis')

//Import connection to database
require('./src/connections').connectToMongo();
const redisClient = require('./src/connections').connectToRedis();

//JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Session config
const RedisStore = connectRedis(session);
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: "Peanut",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 0.5 // .5 minutes 
    }
}))

//Set view path
app.set('views', path.join(__dirname,'src','views'));
app.set('view engine', 'ejs');

//Import and use router
const homeRouter = require('./src/routes/homeRoute')
const userRouter = require('./src/routes/userRoute')

app.use("/" , homeRouter)
app.use("/user" , userRouter)


let port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})