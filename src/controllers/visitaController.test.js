const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");
const {
  PrismaCliente,
  prismaClient,
} = require("../app/db/prisma/prismaClient.js");
const VisitaController = require("../controllers/visitaController.js");

const idForTestVisitante = "98ff19c6-eacc-49b4-b9fd-8fd524d6181b";
const idForTestVisitDate = "adcab5fa-1b8f-4e7c-a906-36f95eb05ddf";

const visitaController = new VisitaController();

// // Teste do visitaController

describe("Test de visitaController", () => {
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

// // Teste das requisicoes

describe("/POST /api/visitas create()", () => {
  it("Cria a entidade e retorna startusCode 200", async () => {
    // TEST: Request to create de entity

    const res = await request(app)
      .post("/api/visitas/")
      .send({
        visitDate: "createTestVisitDate",
        visitanteId: `${idForTestVisitante}`,
      });

    // Query to clear the entity

    const locateIdCreateTestUser = await prismaClient.visita.findFirst({
      where: {
        visitDate: "createTestVisitDate",
      },
    });

    if (locateIdCreateTestUser) {
      const { id } = locateIdCreateTestUser;
      await prismaClient.visita.delete({
        where: {
          id,
        },
      });
    }

    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /api/visitas findAll()", () => {
  it("Lista todas entidades e retorna statusCode 200", async () => {
    const res = await request(app).get("/api/visitas/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /api/visitas/:id findOne()", () => {
  it("Localiza a entidade pelo id e retorna statuscode 200", async () => {
    const res = await request(app).get(`/api/visitas/${idForTestVisitDate}`);
    expect(res.body.id).toBeDefined();
    expect(res.statusCode).toEqual(200);
  });
});

describe("/PATCH /api/visitas/:id update()", () => {
  it("Atualiza informações pelo id e retorna statuscode 200", async () => {
    const res = await request(app)
      .patch(`/api/visitas/${idForTestVisitDate}`)
      .send({
        visitDate: "forTestVisitDate",
      });

    expect(res.statusCode).toEqual(200);
  });
});

describe("/DELETE /api/visitas/:id delete()", () => {
  it("Apaga a entidade pelo id e retorna statuscode 200", async () => {
    // Create the entity to be deleted

    const findDeleteTestUser = await prismaClient.visita.findFirst({
      where: {
        visitDate: "deleteTesVisitDate",
      },
    });

    if (findDeleteTestUser) {
      const { id } = findDeleteTestUser;
      const res = await request(app).delete(`/api/visitas/${id}`);
    } else {
      const forTestCreateEntity = await request(app)
        .post("/api/visitas")
        .send({
          visitDate: "deleteTesVisitDate",
          visitanteId: `${idForTestVisitante}`,
        });

      const { id } = findDeleteTestUser;

      const res = await request(app).delete(`/api/visitas/${id}`);
      expect(res.statusCode).toEqual(200);
    }
  });
});
