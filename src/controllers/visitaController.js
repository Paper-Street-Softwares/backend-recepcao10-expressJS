const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const { visitaSchema } = require("../app/validation/visitaSchema.js");
const logger = require("../app/logs/logger.js");
const objectID = require("mongodb").ObjectId;

class VisitaController {
  async findAll(request, response) {
    try {
      const findAll = await prismaClient.visita.findMany({
        select: {
          visitDate: true,
          id: true,
          visitante: { select: { name: true, id: true } },
        },
      });
      return response.status(200).json(findAll);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async findOne(request, response) {
    try {
      const { id } = request.params;

      if (objectID.isValid(id)) {
        const userFound = await prismaClient.visita.findFirst({
          select: {
            visitDate: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            visitante: {
              select: {
                name: true,
                id: true,
                _count: true,
                visits: {
                  select: {
                    visitDate: true,
                  },
                },
              },
            },
          },
          where: {
            id,
          },
        });

        if (userFound) {
          return response.status(200).json(userFound);
        }
        return response.status(400).json({ error: "Visita not found." });
      } else {
        return response.status(400).json({ error: "Visita not found." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async create(request, response) {
    try {
      const { visitDate, visitanteId } = request.body;

      const { error } = await visitaSchema.validate(request.body);

      if (error) {
        response
          .status(400)
          .json({ error: error.details.map((detail) => detail.message) });
      } else {
        if (objectID.isValid(visitanteId)) {
          const checkIfVisitanteExists = await prismaClient.visitante.findFirst(
            {
              where: {
                id: visitanteId,
              },
            }
          );

          if (!checkIfVisitanteExists) {
            return response.status(400).json({
              error:
                "User not found. Check if the ID matches with a existent user.",
            });
          }

          const foundVisit = await prismaClient.visitante.findFirst({
            where: {
              id: visitanteId,
              visits: {
                some: {
                  visitDate: visitDate,
                },
              },
            },
          });

          if (!foundVisit) {
            const newVisit = await prismaClient.visita.create({
              data: {
                visitDate,
                visitanteId,
              },
            });

            return response.status(200).json(newVisit);
          } else {
            return response
              .status(400)
              .json({ error: "Visit already created." });
          }
        } else {
          return response.status(400).json({
            error:
              "User not found. Check if the ID matches with a existent user.",
          });
        }
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async update(request, response) {
    try {
      const { visitDate } = request.body;
      const { id } = request.params;

      if (objectID.isValid(id)) {
        const foundUser = await prismaClient.visita.findFirst({
          where: {
            id,
          },
        });

        if (foundUser) {
          const updatedUser = await prismaClient.visita.update({
            data: {
              visitDate,
            },
            where: {
              id,
            },
          });
          return response.status(200).json(updatedUser);
        } else {
          return response.status(400).json({
            error:
              "User not found. Check if the ID matches with a existent user.",
          });
        }
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
  async delete(request, response) {
    try {
      const { id } = request.params;

      if (objectID.isValid(id)) {
        const foundUser = await prismaClient.visita.findFirst({
          where: {
            id,
          },
        });

        if (foundUser) {
          const deletedUser = await prismaClient.visita.delete({
            where: {
              id,
            },
          });

          return response.status(200).json(deletedUser);
        } else {
          return response.status(400).json({ error: "User not found." });
        }
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = VisitaController;
