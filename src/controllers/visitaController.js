const { request, response } = require("express");
const logger = require("../app/logs/logger.js");
const { PrismaCliente } = require("../app/db/prisma/prismaClient.js");

class VisitaController {
  async findAll() {
    return response.status(200).json({ msg: "ok" });
  }
  async findOne() {}
  async create() {}
  async update() {}
  async delete() {}
}

module.exports = VisitaController;
