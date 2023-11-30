import express from "express";
import router from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.listen(3000, () => {
  console.log(
    "Server is runing ok. Check https://recep10-expressjs.onrender.com/"
  );
});
