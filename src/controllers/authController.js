const { request, response } = require("express");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const { authSchema } = require("../app/validation/authSchema.js");
const logger = require("../app/logs/logger.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      const { error } = await authSchema.validate(request.body);

      if (error) {
        response
          .status(400)
          .json({ error: error.details.map((detail) => detail.message) });
      } else {
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
      }
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }
  }

  async recoveryPassowrd(request, response) {
    try {
      const { email } = request.body;

      if (!email) {
        return response
          .status(400)
          .json({ error: "You need to fill your email." });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "proj.se.recep10@gmail.com",
          pass: "aaskwozrbcisuirj",
        },
      });

      const mailOptions = {
        from: "proj.se.recep10@gmail.com",
        to: email,
        subject: "Redefinição de Senha - Recepção Nota 10",
        text: "Olá, tudo bem? Recebemos uma solicitação de mudança de senha para sua conta. Para prosseguir, clique no link a seguir: www.recepcao10.com/recovery$12dasdsad1231dsadsa1231",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado" + info.response);
          return response.status(200).json({ status: "Message sent" });
        }
      });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
