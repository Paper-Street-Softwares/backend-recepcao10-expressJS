import { Router } from "express";
import nameRouter from "./nameRouter.js";

const router = Router();

router.use(nameRouter);

export default router;
