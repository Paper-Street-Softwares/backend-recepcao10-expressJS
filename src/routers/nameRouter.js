import { Router } from "express";

const nameRouter = Router();

nameRouter.get("/name", (req, res) => {
  res.status(200).send({ status: "Name route ok" });
});

export default nameRouter;
