const { Router } = require("express");
const VisitaController = require("../controllers/visitaController.js");

const visitaRouter = Router();
const visitaController = new VisitaController();

visitaRouter.get("/api/visitas/", visitaController.findAll);
visitaRouter.get("/api/visitas/:id", visitaController.findOne);
visitaRouter.post("/api/visitas/", visitaController.create);
visitaRouter.patch("/api/visitas/:id", visitaController.update);
visitaRouter.delete("/api/visitas/:id", visitaController.delete);

module.exports = visitaRouter;
