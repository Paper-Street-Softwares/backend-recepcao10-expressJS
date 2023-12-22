const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const logger = require("../app/logs/logger.js");

class AuthController {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      const findUser = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (password === findUser.password) {
        return response.status(200).json({
          status: "Usuário autenticado com sucesso!",
          tokenJWT:
            "$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS$2b$12$u1qZPiqlqkMbhc/0/oepCO/41d.WslEbQfPr9rVV0Eh.ZDvgVEsAS",
        });
      } else {
        return response.status(400).json({ status: "Falha na autenticação" });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
