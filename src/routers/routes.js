const { Router } = require("express");
const visitanteRouter = require("./visitanteRouter.js");
const visitaRouter = require("./visitaRouter.js");

const router = Router();

router.use(visitanteRouter);
router.use(visitaRouter);

module.exports = router;
