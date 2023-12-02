const { Router } = require("express");
const nameRouter = require("./nameRouter.js");

const router = Router();

router.use(nameRouter);

module.exports = router;
