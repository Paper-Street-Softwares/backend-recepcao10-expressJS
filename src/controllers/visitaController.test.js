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

// Teste das requisicoes

describe("/GET /api/visitas findAll()", () => {
  it("Retorna statusCode 200", async () => {
    const res = await request(app).get("/api/visitas/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/POST /api/visitas create()", () => {
  it("Retorna startusCode 200", async () => {
    const res = await request(app).post("/api/visitas/").send({
      visitDate: "11/11/2024",
      visitanteId: "33e3db71-1955-4725-ab55-14c59cb26360",
    });
    expect(res.statusCode).toEqual(200);
  });
});

// describe("/POST /api/visitas create()", () => {
//   it("Retorna startusCode 200", async () => {
//     const res = await request(app).post("/api/visitas/").send({
//       visitDate: "11/11/2024",
//       visitanteId: "",
//     });
//     expect(res.statusCode).toEqual(500);
//   });
// });
