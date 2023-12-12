const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const VisitanteController = require("./visitanteController.js");

const visitanteController = new VisitanteController();
const idToTestFindById = "5944281c-86fb-4f99-94f5-d27fe3276207";

beforeEach(async () => {
  const findBeforeUpdate = await prismaClient.visitante.findFirst({
    where: {
      name: "beforeUpdate",
    },
  });

  if (!findBeforeUpdate) {
    createUpdateUser = await request(app).post("/api/visitantes/").send({
      name: "beforeUpdate",
    });

    const findToBeDeletedUser = await prismaClient.visitante.findFirst({
      where: {
        name: "ToBeDeletedUser",
      },
    });

    if (!findToBeDeletedUser) {
      createToBeDeletedUser = await request(app).post("/api/visitantes/").send({
        name: "ToBeDeletedUser",
      });
    }
  }
});

afterEach(async () => {
  const findUsuarioTest = await prismaClient.visitante.findFirst({
    where: {
      name: "UsuarioTeste",
    },
  });

  if (findUsuarioTest) {
    const { id } = findUsuarioTest;

    const deleteUsuarioTest = await prismaClient.visitante.delete({
      where: {
        id,
      },
    });
  }

  const findUpdateTest = await prismaClient.visitante.findFirst({
    where: {
      name: "afterUpdate",
    },
  });

  if (findUpdateTest) {
    const { id } = findUpdateTest;

    const deleteUsuarioTest = await prismaClient.visitante.delete({
      where: {
        id,
      },
    });
  }

  const findUpdateTest2 = await prismaClient.visitante.findFirst({
    where: {
      name: "beforeUpdate",
    },
  });

  if (findUpdateTest2) {
    const { id } = findUpdateTest2;

    const deleteUsuarioTest = await prismaClient.visitante.delete({
      where: {
        id,
      },
    });
  }
});

// Testes de existência dos métodos executados pelo Controller

describe("Test de visitanteController", () => {
  it("Verifica se método findOne está definida", () => {
    expect(visitanteController.findOne).toBeDefined();
  });

  it("Verifica se método findAll está definida", () => {
    expect(visitanteController.findAll).toBeDefined();
  });

  it("Verifica se método create está definida", () => {
    expect(visitanteController.create).toBeDefined();
  });

  it("Verifica se método update está definida", () => {
    expect(visitanteController.update).toBeDefined();
  });

  it("Verifica se método delete está definida", () => {
    expect(visitanteController.findOne).toBeDefined();
  });
});

// Teste das requisicoes

describe("/POST /name create()", () => {
  it("Deve criar a entidade e retornar statusCode 201", async () => {
    const res = await request(app).post("/api/visitantes/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.statusCode).toEqual(201);
  });
});

describe("/GET /name findAll()", () => {
  it("Lista todas entidades e retorna statusCode 200", async () => {
    const res = await request(app).get("/api/visitantes/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /name:id findOne()", () => {
  it("Deve encontrar a entidade pelo id e retornar statusCode 200", async () => {
    const res = await request(app).get(`/api/visitantes/${idToTestFindById}/`);
    expect(res.body.id).toBeDefined();
    expect(res.statusCode).toEqual(200);
  });
});

describe("/PATCH /name update()", () => {
  it("Deve alterar o nome da entidade informado no id e retornar statusCode 200", async () => {
    const previousUser = await prismaClient.visitante.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/visitantes/${id}`).send({
      name: "afterUpdate",
    });
    expect(res.body.name).toBe("afterUpdate");
    expect(res.statusCode).toBe(200);
  });
});

describe("/DEL /name:id delete()", () => {
  it("Deve deletar a entidade informada no id e retorna statusCode 200", async () => {
    const userToBeDeleted = await prismaClient.visitante.findFirst({
      where: {
        name: "ToBeDeletedUser",
      },
    });

    const { id } = userToBeDeleted;
    const res = await request(app).delete(`/api/visitantes/${id}`);

    expect(res.statusCode).toEqual(200);
  });
});
