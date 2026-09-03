const express = require("express");
const { default: mongoose } = require('mongoose');
const todoItemRouter = require("./routes/todoItemRouter");
const cors = require('cors')
const { pageNotFound } = require("./controllers/errors");

const DB_PATH = "mongodb+srv://pavankumar_db_user:pAVAN%402%25@completecoding.etzcvrz.mongodb.net/ToDo?retryWrites=true&w=majority&appName=CompleteCoding"

const app = express()

app.use(express.json());
app.use(cors());

app.use("/todoItem", todoItemRouter)

app.use(pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log('Error while connecting to Mongo: ', err)
})

