const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");
const { PrismaCliente } = require("../app/db/prisma/prismaClient.js");
const VisitaController = require("../controllers/visitaController.js");

const visitaController = new VisitaController();

describe("Test de visitanController", () => {
  it("Verifica se método findOne está definida", () => {
    expect(visitaController.findOne).toBeDefined();
  });

  it("Verifica se método findAll está definida", () => {
    expect(visitaController.findAll).toBeDefined();
  });

  it("Verifica se método create está definida", () => {
    expect(visitaController.create).toBeDefined();
  });

  it("Verifica se método update está definida", () => {
    expect(visitaController.update).toBeDefined();
  });

  it("Verifica se método delete está definida", () => {
    expect(visitaController.findOne).toBeDefined();
  });
});
