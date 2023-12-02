const { Router } = require("express");
const NameController = require("../controllers/nameController.js");

const nameRouter = Router();

const nameController = new NameController();

nameRouter.get("/name", nameController.findAll);
nameRouter.get("/name/:id", nameController.findOne);
nameRouter.post("/name", nameController.create);
nameRouter.patch("/name/:id", nameController.update);
nameRouter.delete("/name/:id", nameController.delete);

module.exports = nameRouter;
