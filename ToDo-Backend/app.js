require("dotenv").config();

const express = require("express");
const { default: mongoose } = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cors = require('cors')


const todoItemRouter = require("./routes/todoItemRouter");
const authRouter = require("./routes/authRouter");
const { pageNotFound } = require("./controllers/errors");
const authMiddleware = require("./middleware/authMiddleware");

const DB_PATH = process.env.MONGO_URI;

const app = express()

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: DB_PATH,
            collectionName: "sessions"
        })
    })
);

app.use("/auth", authRouter)
app.use(authMiddleware);
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

