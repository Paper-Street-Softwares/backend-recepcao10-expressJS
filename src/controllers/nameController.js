import { request, response } from "express";
import { prismaClient } from "../app/db/prisma/prismaClient.js";

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
    const newUser = await prismaClient.testName.create({
      data: {
        name,
      },
    });

    return response.status(201).json(newUser);
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
