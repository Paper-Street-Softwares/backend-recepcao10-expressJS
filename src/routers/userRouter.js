const { Router } = require("express");
const UserController = require("../controllers/userController.js");

const userRouter = Router();
const userController = new UserController();

userRouter.get("/api/users", userController.findAll);
userRouter.get("/api/users/:id", userController.findOne);
userRouter.post("/api/users", userController.create);
userRouter.patch("/api/users/:id", userController.update);
userRouter.delete("/api/users/:id", userController.delete);

module.exports = userRouter;
