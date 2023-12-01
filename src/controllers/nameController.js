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

    if (!userFound) {
      logger.error({
        src: "findOne() | nameController.js",
        error: "User not found.",
      });
      return response.status(400).json({
        src: "findOne() | nameController.js",
        error: "User not found.",
      });
    } else {
      return response.status(200).json(userFound);
    }
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
        logger.error({
          src: "create() | nameController.js",
          error: "User already created.",
        });
        return response.status(400).json({
          src: "create() | nameController.js",
          error: "User already created.",
        });
      } else {
        const newUser = await prismaClient.testName.create({
          data: {
            name,
          },
        });
        return response.status(201).json(newUser);
      }
    } catch (err) {
      logger.error(err, {
        error: "exemplo do erro",
        src: "fonte do erro",
      });
    }
  }

  async update(request, response) {
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
      logger.error({
        src: "update() | nameController.js",
        error: "User not found.",
      });
      return response.status(400).json({
        src: "update() | nameController.js",
        error: "User not found.",
      });
    }
  }

  async delete(request, response) {
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
      logger.error({
        src: "delete() | nameController.js",
        error: "User not found.",
      });
      return response.status(400).json({
        src: "delete() | nameController.js",
        error: "User not found.",
      });
    }
  }
}

export default NameController;
