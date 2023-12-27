const { Router } = require("express");
const AuthController = require("../controllers/authController.js");

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth", authController.login);
authRouter.post("/auth/forgot-password", authController.forgotPassword);
authRouter.get("/auth/reset-password/:token", authController.checkToken);
authRouter.post("/auth/reset-password/:token", authController.newPassword);

module.exports = authRouter;
