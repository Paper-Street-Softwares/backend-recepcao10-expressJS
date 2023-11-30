import { request, response } from "express";

class NameController {
  async findAll(request, response) {
    response.status(200).json({ status: "Get/name ok" });
  }

  async create(request, response) {
    response.status(201).json({ status: "Post/name ok" });
  }
}

export default NameController;
