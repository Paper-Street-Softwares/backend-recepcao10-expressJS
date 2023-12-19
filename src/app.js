const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
const express = require("express");
const router = require("./routers/routes.js");

const app = express();

app.use(express.json());
app.use(router);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => {
  response.status(200).send({ status: "Server OK." });
});

module.exports = app;
