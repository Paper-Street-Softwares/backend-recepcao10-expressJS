const { Router } = require("express");
const NameController = require("../controllers/nameController.js");

const nameRouter = Router();

const nameController = new NameController();

nameRouter.get("/api/name", nameController.findAll);
nameRouter.get("/api/name/:id", nameController.findOne);
nameRouter.post("/api/name", nameController.create);
nameRouter.patch("/api/name/:id", nameController.update);
nameRouter.delete("/api/name/:id", nameController.delete);

module.exports = nameRouter;
