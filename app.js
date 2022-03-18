const express = require('express');
const app = express();
require('dotenv').config()
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//import controller 
const homeRouter = require('./src/routers/homeRouter')
const apiRouter = require('./src/routers/apiRouter');



//Router
app.use('/', homeRouter)

//API
app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })