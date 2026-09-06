const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", authController.postSignup);
authRouter.post("/signin", authController.postSignin);

module.exports = authRouter;
