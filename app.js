require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const { enableCORS } = require('./src/middlewares/')

global.__basedir = __dirname;

//connect to mongo db
require('./src/connection/connection').connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//enableCORS
app.use(enableCORS);

//import controller 
const apiRouter = require('./src/routers/apiRouter');
const userRouter = require('./src/routers/userRouter');


app.use('/api', apiRouter)
app.use('/user' , userRouter)

//static 
app.use('/static', express.static(path.join('src', 'public')))

app.use((req, res, next) => {
    res.status(404);
    res.type('json').send({ "message": "404 file not found" });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })