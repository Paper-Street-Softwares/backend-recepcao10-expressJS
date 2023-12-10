const app = require("./app.js");
const logger = require("./app/logs/logger.js");

app.listen(3000, () => {
  logger.info("Server ok. Check http://localhost:3000/api/visitantes");
});
