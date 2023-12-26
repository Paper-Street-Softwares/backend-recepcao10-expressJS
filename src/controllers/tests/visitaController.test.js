const request = require("supertest");
const app = require("../../app.js");
const { prismaClient } = require("../../app/db/prisma/prismaClient.js");
const logger = require("../../app/logs/logger.js");
const VisitaController = require("../visitaController.js");

const visitaController = new VisitaController();
const idToTestFindById = "65808b8eeb9b0c4212971c64";

beforeAll(async () => {
  // Create findOneTest

  const findFindOneTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "2023-01-01",
    },
  });

  if (!findFindOneTestUser) {
    const res = await request(app)
      .post("/api/visitas")
      .send({
        visitDate: "2023-01-01",
        visitanteId: `${idToTestFindById}`,
      });
  }

  // Create 2023-01-02

  const findDeleteTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "2023-01-02",
    },
  });

  if (!findDeleteTestUser) {
    const res = await request(app)
      .post("/api/visitas")
      .send({
        visitDate: "2023-01-02",
        visitanteId: `${idToTestFindById}`,
      });
  }
});

afterAll(async () => {
  // Delete findONeTestUser

  const locateIdFindOneTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "2023-01-01",
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

  // Delete 2023-01-03

  const locateIdCreateTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "2023-01-03",
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

  // Delete 2023-01-02

  const locateIdDeleteTestUser = await prismaClient.visita.findFirst({
    where: {
      visitDate: "2023-01-02",
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

describe("/POST /api/visitas create()", () => {
  it("Cria a entidade e retorna startusCode 200", async () => {
    const res = await request(app)
      .post("/api/visitas/")
      .send({
        visitDate: "2023-01-03",
        visitanteId: `${idToTestFindById}`,
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
        visitDate: "2023-01-01",
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
        visitDate: "2023-01-01",
      },
    });

    const { id } = user;

    const res = await request(app).patch(`/api/visitas/${id}`).send({
      visitDate: "2023-01-01",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("/DELETE /api/visitas/:id delete()", () => {
  it("Apaga a entidade pelo id e retorna statuscode 200", async () => {
    const findDeleteTestUser = await prismaClient.visita.findFirst({
      where: {
        visitDate: "2023-01-02",
      },
    });

    const { id } = findDeleteTestUser;

    const res = await request(app).delete(`/api/visitas/${id}`);
    expect(res.statusCode).toEqual(200);
  });
});
