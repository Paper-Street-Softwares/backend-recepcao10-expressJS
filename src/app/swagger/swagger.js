const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const baseUrl = process.env.DEPLOY_URL;

const doc = {
  info: {
    title: "Recepcao Nota 10 API Documentation",
    description: "This is the Recepcao Nota 10 documentation",
  },
  host: baseUrl,
  schemes: ["https"],
};

const outputFile = "../../../swagger-output.json";
const routes = ["../../routers/routes.js", "../../app.js"];

swaggerAutogen(outputFile, routes, doc);
