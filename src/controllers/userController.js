const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const logger = require("../app/logs/logger.js");
const { hash, genSalt, bcrypt } = require("bcrypt");
const objectID = require("mongodb").ObjectId;

class UserController {
  async findAll(request, response) {
    try {
      const findAll = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
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
        const findOne = await prismaClient.user.findFirst({
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            id,
          },
        });

        if (findOne) {
          return response.status(200).json(findOne);
        } else {
          return response.status(400).json({
            error:
              "User not found. Check if the ID matches with a existent user.",
          });
        }
      } else {
        return response.status(400).json({
          error:
            "User not found. Check if the ID matches with a existent user.",
        });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
  async create(request, response) {
    try {
      const { name, email, password } = request.body;

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      if (!name || !email || !password) {
        return response
          .status(400)
          .json({ message: "All required field must be informed." });
      }

      const foundUser = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!foundUser) {
        const newUser = await prismaClient.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return response.status(200).send(newUser);
      } else {
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
      const { name, email, password } = request.body;

      if (objectID.isValid(id)) {
        const foundUser = await prismaClient.user.findFirst({
          where: {
            id,
          },
        });

        if (foundUser) {
          const updatedUser = await prismaClient.user.update({
            data: {
              name,
              email,
              password,
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
      } else {
        return response.status(400).json({
          error:
            "User not found. Check if the ID matches with a existent user.",
        });
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
        const userFound = await prismaClient.user.findFirst({
          where: {
            id,
          },
        });

        if (userFound) {
          const deletedUser = await prismaClient.user.delete({
            where: {
              id,
            },
          });

          return response.status(200).json(deletedUser);
        } else {
          return response.status(400).json({
            error:
              "User not found. Check if the ID matches with a existent user.",
          });
        }
      } else {
        return response.status(400).json({
          error:
            "User not found. Check if the ID matches with a existent user.",
        });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
