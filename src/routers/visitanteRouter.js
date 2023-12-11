const { Router } = require("express");
const VisitanteController = require("../controllers/visitanteController.js");

const visitanteRouter = Router();
const visitanteController = new VisitanteController();

visitanteRouter.get("/api/visitantes", visitanteController.findAll);
visitanteRouter.get("/api/visitantes/:id", visitanteController.findOne);
visitanteRouter.post("/api/visitantes", visitanteController.create);
visitanteRouter.patch("/api/visitantes/:id", visitanteController.update);
visitanteRouter.delete("/api/visitantes/:id", visitanteController.delete);

module.exports = visitanteRouter;
