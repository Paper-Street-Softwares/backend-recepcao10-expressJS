const app = require("./app.js");
const logger = require("./app/logs/logger.js");
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  logger.info("http://localhost:3000");
});
