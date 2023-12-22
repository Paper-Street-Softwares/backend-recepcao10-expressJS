const { Router } = require("express");
const AuthController = require("../controllers/authController.js");

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth", authController.login);

module.exports = authRouter;
