import { request, response } from "express";
import { prismaClient } from "../app/db/prisma/prismaClient.js";
import logger from "../app/logs/logger.js";

class NameController {
  async findAll(request, response) {
    const findAll = await prismaClient.testName.findMany();
    return response.status(200).json(findAll);
  }

  async findOne(request, response) {
    const { id } = request.params;
    const userFound = await prismaClient.testName.findFirst({
      where: {
        id,
      },
    });
    return response.status(200).json(userFound);
  }

  async create(request, response) {
    const { name } = request.body;

    try {
      const foundUser = await prismaClient.testName.findFirst({
        where: {
          name,
        },
      });

      if (foundUser) {
        logger.error("User already created.");
        return response.status(400).json({ error: "User already created." });
      } else {
        const newUser = await prismaClient.testName.create({
          data: {
            name,
          },
        });
        return response.status(201).json(newUser);
      }
    } catch (err) {
      logger.error("User already created.");
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const updatedUser = await prismaClient.testName.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return response.status(200).json(updatedUser);
  }

  async delete(request, response) {
    const { id } = request.params;
    const deletedUser = await prismaClient.testName.delete({
      where: {
        id,
      },
    });

    return response.status(200).json(deletedUser);
  }
}

export default NameController;
