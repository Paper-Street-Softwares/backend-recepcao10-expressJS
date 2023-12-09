const { Router } = require("express");
const VisitanteController = require("../controllers/visitanteController.js");

const visitanteRouter = Router();

const visitanteController = new VisitanteController();

visitanteRouter.get("/api/visitante", visitanteController.findAll);
visitanteRouter.get("/api/visitante/:id", visitanteController.findOne);
visitanteRouter.post("/api/visitante", visitanteController.create);
visitanteRouter.patch("/api/visitante/:id", visitanteController.update);
visitanteRouter.delete("/api/visitante/:id", visitanteController.delete);

module.exports = visitanteRouter;
