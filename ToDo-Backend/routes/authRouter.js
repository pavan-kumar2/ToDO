const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", authController.postSignup);
authRouter.post("/signin", authController.postSignin);
authRouter.post("/signout", authController.postSignout);

module.exports = authRouter;
