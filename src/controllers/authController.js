const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const logger = require("../app/logs/logger.js");

class AuthController {
  async login(request, response) {
    try {
      console.log("Test");
      return response.status(200).json({ test: "test" });
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
