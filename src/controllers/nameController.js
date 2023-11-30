import { request, response } from "express";

class NameController {
  async get(request, response) {
    response.status(200).json({ status: "Get controller ok" });
  }
}

export default NameController;
