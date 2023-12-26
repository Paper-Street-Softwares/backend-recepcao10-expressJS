const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const logger = require("../app/logs/logger.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      const findUser = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (findUser) {
        const userID = findUser.id;

        const token = jwt.sign({ userID }, process.env.SECRET_JWT, {
          expiresIn: 86400,
        });

        bcrypt.compare(password, findUser.password, (err, result) => {
          if (err) {
            console.log("Error ao comparar senhas.", err);
            return response.status(500).send({ error: err.message });
          }

          if (result) {
            response.header("Authorization", `Bearer ${token}`);
            response.status(200).send({ status: "Autenticado com sucesso." });
          } else {
            response.status(400).json({ error: "Email ou senha inválidos." });
          }
        });
      } else {
        response.status(400).json({ error: "Email ou senha inválidos." });
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
