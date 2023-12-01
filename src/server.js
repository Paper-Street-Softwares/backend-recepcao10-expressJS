import express, { request, response } from "express";
import router from "./routers/routes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(router);

// app.get("/", (request, response) => {
//   response
//     .status(200)
//     .send({ status: "ok", nameRoute: "http://localhost:3000/name" });
// });

app.get("/get", (request, response) => {
  response.status(200).json({ info: "Dudu" });
});

app.post("/", (request, response) => {
  const { payload } = request.body;
  console.log(payload);
  if (!payload) {
    return response.status(400).send({ status: "failed." });
  }

  response.status(201).send({ status: "received." });
});

app.listen(3000, () => {
  console.log("Server is runing ok. Check http://localhost:3000");
});
