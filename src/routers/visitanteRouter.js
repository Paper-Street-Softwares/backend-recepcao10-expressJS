const { Router } = require("express");
const NameController = require("../controllers/visitanteController.js");

const visitanteRouter = Router();

const nameController = new NameController();

visitanteRouter.get("/api/name", nameController.findAll);
visitanteRouter.get("/api/name/:id", nameController.findOne);
visitanteRouter.post("/api/name", nameController.create);
visitanteRouter.patch("/api/name/:id", nameController.update);
visitanteRouter.delete("/api/name/:id", nameController.delete);

module.exports = visitanteRouter;
