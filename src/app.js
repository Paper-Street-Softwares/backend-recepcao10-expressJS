const express = require("express");
const router = require("./routers/routes.js");

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  response.status(200).send("Server OK");
});

module.exports = app;
