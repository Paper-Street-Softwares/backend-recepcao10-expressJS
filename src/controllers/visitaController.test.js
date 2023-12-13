const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const VisitaController = require("../controllers/visitaController.js");

const visitaController = new VisitaController();

beforeAll(async () => {
  // Create findOneTestUser

  const findFindOneTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "findOneTestUser",
    },
  });

  if (!findFindOneTestUser) {
    const res = await request(app).post("/api/visitas").send({
      visitDate: "findOneTestUser",
      visitanteId: "2d087b07-c8c1-4a62-87b8-d779374d5ca9",
    });
  }

  // Create deleteTestUser

  const findDeleteTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "deleteTestUser",
    },
  });

  if (!findDeleteTestUser) {
    const res = await request(app).post("/api/visitas").send({
      visitDate: "deleteTestUser",
      visitanteId: "2d087b07-c8c1-4a62-87b8-d779374d5ca9",
    });
  }
});

afterAll(async () => {
  // Delete findONeTestUser

  const locateIdFindOneTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "findOneTestUser",
    },
  });

  if (locateIdFindOneTestUser) {
    const { id } = locateIdFindOneTestUser;
    await prismaClient.visita.delete({
      where: {
        id,
      },
    });
  }

  // Delete createTestUser

  const locateIdCreateTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "createTestUser",
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

  // Delete deleteTestUser

  const locateIdDeleteTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "deleteTestUser",
    },
  });

  if (locateIdDeleteTestUser) {
    const { id } = locateIdDeleteTestUser;
    await prismaClient.visita.delete({
      where: {
        id,
      },
    });
  }
});

// Teste do visitaController

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

// Teste das requisicoes

describe("/POST /api/visitas create()", () => {
  it("Cria a entidade e retorna startusCode 200", async () => {
    const res = await request(app).post("/api/visitas/").send({
      visitDate: "createTestUser",
      visitanteId: "2d087b07-c8c1-4a62-87b8-d779374d5ca9",
    });
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
  it("Localiza a entidade pelo id e retorna statusCode 200", async () => {
    const findFindOneTestUser = await prismaClient.visita.findFirst({
      where: {
        visitDate: "findOneTestUser",
      },
    });

    const { id } = findFindOneTestUser;

    const res = await request(app).get(`/api/visitas/${id}`);
    expect(res.body.id).toBeDefined();
    expect(res.statusCode).toEqual(200);
  });
});

describe("/PATCH /api/visitas/:id update()", () => {
  it("Deve atualizar as informações das entidade e retornar statuscode 200", async () => {
    const user = await prismaClient.visita.findFirst({
      where: {
        visitDate: "findOneTestUser",
      },
    });

    const { id } = user;

    const res = await request(app).patch(`/api/visitas/${id}`).send({
      visitDate: "findOneTestUser",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("/DELETE /api/visitas/:id delete()", () => {
  it("Apaga a entidade pelo id e retorna statuscode 200", async () => {
    const findDeleteTestUser = await prismaClient.visita.findFirst({
      where: {
        visitDate: "deleteTestUser",
      },
    });

    const { id } = findDeleteTestUser;

    const res = await request(app).delete(`/api/visitas/${id}`);
    expect(res.statusCode).toEqual(200);
  });
});
