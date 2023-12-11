const { request, response } = require("express");
const logger = require("../app/logs/logger.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");

class VisitaController {
  async findAll(request, response) {
    try {
      const findAll = await prismaClient.visita.findMany();
      return response.status(200).json(findAll);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async findOne(request, response) {
    try {
      const { id } = request.params;

      const userFound = await prismaClient.visita.findFirst({
        where: {
          id,
        },
      });

      if (userFound) {
        return response.status(200).json(userFound);
      }
      logger.error("User not found.");
      return response.status(400).json({ error: "User not found." });
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async create(request, response) {
    try {
      const { visitDate, visitanteId } = request.body;

      if ((!visitDate, !visitanteId)) {
        return response
          .status(400)
          .json({ error: "The date and Id of visitante are required." });
      }

      const newVisit = await prismaClient.visita.create({
        data: {
          visitDate,
          visitanteId,
        },
      });

      return response.status(200).json(newVisit);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async update() {}
  async delete() {}
}

module.exports = VisitaController;