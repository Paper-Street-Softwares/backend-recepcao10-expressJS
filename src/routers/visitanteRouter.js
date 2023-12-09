const { Router } = require("express");
const VisitanteController = require("../controllers/visitanteController.js");

const visitanteRouter = Router();

const visitanteController = new VisitanteController();

visitanteRouter.get("/api/name", visitanteController.findAll);
visitanteRouter.get("/api/name/:id", visitanteController.findOne);
visitanteRouter.post("/api/name", visitanteController.create);
visitanteRouter.patch("/api/name/:id", visitanteController.update);
visitanteRouter.delete("/api/name/:id", visitanteController.delete);

module.exports = visitanteRouter;
