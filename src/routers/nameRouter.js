import { Router } from "express";
import NameController from "../controllers/nameController.js";

const nameRouter = Router();

const nameController = new NameController();

nameRouter.get("/name", nameController.findAll);

export default nameRouter;
