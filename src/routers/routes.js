const { Router } = require("express");
const visitanteRouter = require("./visitanteRouter.js");

const router = Router();

router.use(visitanteRouter);

module.exports = router;
