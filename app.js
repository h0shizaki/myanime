require('dotenv').config()
const express = require('express');
const app = express();

require('./src/connections').connectToMongo();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello")
})


let port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})