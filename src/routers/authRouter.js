const { Router } = require("express");
const AuthController = require("../controllers/authController.js");

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth", authController.login);
authRouter.post("/auth/recovery", authController.recoveryPassowrd);

module.exports = authRouter;
