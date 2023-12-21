const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const looger = require("../app/logs/logger.js");
const logger = require("../app/logs/logger.js");
const objectID = require("mongodb").ObjectId;

class UserController {
  async findAll(request, response) {
    try {
      return response.status(200).json({ route: "findAll" });
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async findOne(request, response) {}
  async create(request, response) {}
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = UserController;
