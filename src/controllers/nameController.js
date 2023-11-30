import { request, response } from "express";
import { prismaClient } from "../app/db/prisma/prismaClient.js";

class NameController {
  async findAll(request, response) {
    const findAll = await prismaClient.testName.findMany();
    return response.status(200).json(findAll);
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
}

export default NameController;
