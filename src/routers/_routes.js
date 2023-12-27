const { Router } = require("express");
const visitanteRouter = require("./visitanteRouter.js");
const visitaRouter = require("./visitaRouter.js");
const userRouter = require("./userRouter.js");
const authRouter = require("./authRouter.js");

const router = Router();

router.use(userRouter);
router.use(visitanteRouter);
router.use(visitaRouter);
router.use(authRouter);

module.exports = router;
