const express = require("express");
const router = require("./routers/routes.js");

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  response.status(200).send({
    serverStatus: "Ok",
    visitanteRoute: "http://localhost:3000/api/visitantes",
    visitasRoute: "http://localhost:3000/api/visitas",
  });
});

module.exports = app;
