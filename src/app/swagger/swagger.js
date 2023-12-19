const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const baseUrl = process.env.DEPLOY_URL;

const doc = {
  info: {
    title: "Recepcao Nota 10 API Documentation",
    description: "Documentation for the application Recepcao Nota 10.",
  },
  // host: "localhost:3000",
  host: baseUrl,
  schemes: ["https"],
};

const outputFile = "../../../swagger-output.json";
const routes = ["../../routers/routes.js"];

swaggerAutogen(outputFile, routes, doc);
