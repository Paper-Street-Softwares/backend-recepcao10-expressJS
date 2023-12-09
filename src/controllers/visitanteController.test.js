const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");

const VisitanteController = require("./visitanteController.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const visitanteController = new VisitanteController();

beforeEach(async () => {
  const findBeforeUpdate = await prismaClient.testName.findFirst({
    where: {
      name: "beforeUpdate",
    },
  });

  if (!findBeforeUpdate) {
    createUpdateUser = await request(app).post("/api/name/").send({
      name: "beforeUpdate",
    });

    const findToBeDeletedUser = await prismaClient.testName.findFirst({
      where: {
        name: "ToBeDeletedUser",
      },
    });

    if (!findToBeDeletedUser) {
      createToBeDeletedUser = await request(app).post("/api/name/").send({
        name: "ToBeDeletedUser",
      });
    }
  }
});

afterEach(async () => {
  const findUsuarioTest = await prismaClient.testName.findFirst({
    where: {
      name: "UsuarioTeste",
    },
  });

  if (findUsuarioTest) {
    const { id } = findUsuarioTest;

    const deleteUsuarioTest = await prismaClient.testName.delete({
      where: {
        id,
      },
    });
  }

  const findUpdateTest = await prismaClient.testName.findFirst({
    where: {
      name: "afterUpdate",
    },
  });

  if (findUpdateTest) {
    const { id } = findUpdateTest;

    const deleteUsuarioTest = await prismaClient.testName.delete({
      where: {
        id,
      },
    });
  }

  const findUpdateTest2 = await prismaClient.testName.findFirst({
    where: {
      name: "beforeUpdate",
    },
  });

  if (findUpdateTest2) {
    const { id } = findUpdateTest2;

    const deleteUsuarioTest = await prismaClient.testName.delete({
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

describe("/GET /name findAll()", () => {
  it("Retorna statusCode 200", async () => {
    const res = await request(app).get("/api/name/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /name:id findOne()", () => {
  it("Deve encontrar o usuário pelo id e retornar ele em json", async () => {
    const res = await request(app).get(
      "/api/name/74a247a6-dc40-4d48-8368-e41333b35aac/"
    );
    expect(res.body.name).toBe("edison");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 200", async () => {
    const res = await request(app)
      .get("/api/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
      .send({
        name: "jose",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("Deve retornar os campos obrigatórios do usuário encontrado", async () => {
    const res = await request(app)
      .get("/api/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
      .send({
        name: "jose",
      });
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });
});

describe("/POST /name create()", () => {
  it("Deve criar o usuário e retornar ele em json", async () => {
    const res = await request(app).post("/api/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 201", async () => {
    const res = await request(app).post("/api/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("Deve retornar campos obrigatórios do usuário criado", async () => {
    const res = await request(app).post("/api/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });

  it("Deve retornar 400 se nao for enviado campo necessário", async () => {
    const res = await request(app).post("/api/name/").send({});
    expect(res.statusCode).toEqual(400);
  });
});

describe("/PATCH /name update()", () => {
  it("Deve alterar o nome do usuário informado no id", async () => {
    const previousUser = await prismaClient.testName.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/name/${id}`).send({
      name: "afterUpdate",
    });
    expect(res.body.name).toBe("afterUpdate");
  });

  it("Deve retornar statusCode 200", async () => {
    const previousUser = await prismaClient.testName.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/name/${id}`).send({
      name: "afterUpdate",
    });
    expect(res.statusCode).toBe(200);
  });

  it("Deve retornar statusCode 400 se nao informar campo name", async () => {
    const previousUser = await prismaClient.testName.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/name/${id}`).send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("/DEL /name:id delete()", () => {
  it("Deve deletar o usuário informado no id", async () => {
    const userToBeDeleted = await prismaClient.testName.findFirst({
      where: {
        name: "ToBeDeletedUser",
      },
    });

    const { id } = userToBeDeleted;
    const res = await request(app).delete(`/api/name/${id}`);

    expect(res.statusCode).toEqual(200);
  });
});
