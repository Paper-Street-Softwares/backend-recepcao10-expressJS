const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const logger = require("../app/logs/logger.js");

class NameController {
  async findAll(request, response) {
    try {
      const findAll = await prismaClient.testName.findMany();
      return response.status(200).json(findAll);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }

  async findOne(request, response) {
    try {
      const { id } = request.params;
      const userFound = await prismaClient.testName.findFirst({
        where: {
          id,
        },
      });

      if (userFound) {
        return response.status(200).json(userFound);
      } else {
        logger.error("User not found.");
        return response.status(400).json({ error: "User not found." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }

  async create(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        return response.status(400).json({ error: "Name must be informed." });
      }
      const foundUser = await prismaClient.testName.findFirst({
        where: {
          name,
        },
      });

      if (!foundUser) {
        const newUser = await prismaClient.testName.create({
          data: {
            name,
          },
        });

        return response.status(201).json(newUser);
      } else {
        logger.error("User already created.");
        return response.status(400).json({ error: "User already created." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const foundUser = await prismaClient.testName.findFirst({
        where: {
          id,
        },
      });

      if (foundUser) {
        const updatedUser = await prismaClient.testName.update({
          data: {
            name,
          },
          where: {
            id,
          },
        });
        return response.status(200).json(updatedUser);
      } else {
        logger.error("User not found.");
        return response.status(400).json({ error: "User not found." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const userFound = await prismaClient.testName.findFirst({
        where: {
          id,
        },
      });

      if (userFound) {
        const deletedUser = await prismaClient.testName.delete({
          where: {
            id,
          },
        });

        return response.status(200).json(deletedUser);
      } else {
        logger.error("User not found.");
        return response.status(400).json({ error: "User not found." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = NameController;
