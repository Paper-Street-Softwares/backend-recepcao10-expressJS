const app = require("./app.js");
const logger = require("./app/logs/logger.js");

app.listen(3000, () => {
  logger.info("Server ok");
});
