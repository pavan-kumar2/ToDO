const express = require("express");
const { default: mongoose } = require('mongoose')

const DB_PATH = "mongodb+srv://pavankumar_db_user:pAVAN%402%25@completecoding.etzcvrz.mongodb.net/ToDo?retryWrites=true&w=majority?appName=CompleteCoding"

const app = express()


const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log('Error while connecting to Mongo: ', err)
})

