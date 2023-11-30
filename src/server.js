import express, { request, response } from "express";
import router from "./routers/routes.js";

const app = express();

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

app.listen(3000, () => {
  console.log("Server is runing ok. Check http://localhost:3000");
});
