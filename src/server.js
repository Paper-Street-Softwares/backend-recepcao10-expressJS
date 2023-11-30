import express from "express";
import router from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  response
    .status(200)
    .send({ status: "ok", nameRoute: "http://localhost:3000/name" });
});

app.listen(3000, () => {
  console.log("Server is runing ok. Check http://localhost:3000");
});
