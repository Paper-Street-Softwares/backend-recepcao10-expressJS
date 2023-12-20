const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
const express = require("express");
const router = require("./routers/routes.js");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => {
  // #swagger.tags = ['Index']
  // #swagger.summary = 'Mostra status do servidor, documentação e rotas.'
  response.status(200).send({
    status: "Server OK",
    doc: "/doc",
    routes: {
      visitantes: "/api/visitantes",
      visitas: "/api/visitas",
    },
  });
});

module.exports = app;
