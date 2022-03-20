require('dotenv').config()
const express = require('express');
const  path  = require('path');
const app = express();

global.__basedir = __dirname;

//connect to mongo db
require('./src/connection/connection').connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(path.join(__dirname,'src','public'))
app.use('/static', express.static(path.join('src','public')))

//import controller 
const apiRouter = require('./src/routers/apiRouter');


//API
app.use('/api', apiRouter)

app.use((req, res, next) => {
    res.status(404);
    res.type('json').send({"message":"404 file not found"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })