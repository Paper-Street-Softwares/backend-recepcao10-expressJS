const app = require("./app.js");
const logger = require("./app/logs/logger.js");

app.listen(3000, () => {
  logger.info({
    ServerStatus: "Ok",
    visitanteRoute: "http://localhost:3000/api/visitantes",
    visitasRoute: "http://localhost:3000/api/visitas",
  });
});
