const swaggerAutogen = require("swagger-autogen")();
const host = process.env.DEPLOY_URL;

const doc = {
  info: {
    title: "Recepcao Nota 10 API Documentation",
    description: "Documentation for the application Recepcao Nota 10.n",
  },
  // host: "localhost:3000",
  host: "autogen-back.up.railway.app",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routers/routes.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
