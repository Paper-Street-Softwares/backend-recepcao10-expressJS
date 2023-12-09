const request = require("supertest");
const app = require("../app.js");
const logger = require("../app/logs/logger.js");

const VisitanteController = require("./visitanteController.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const visitanteController = new VisitanteController();
const idToTestFindById = "33e3db71-1955-4725-ab55-14c59cb26360";

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

describe("/GET /name findAll()", () => {
  it("Retorna statusCode 200", async () => {
    const res = await request(app).get("/api/visitantes/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /name:id findOne()", () => {
  it("Deve encontrar o usuário pelo id e retornar ele em json", async () => {
    const res = await request(app).get(`/api/visitantes/${idToTestFindById}/`);
    expect(res.body.name).toBe("Edison Matos");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 200", async () => {
    const res = await request(app).get(`/api/visitantes/${idToTestFindById}/`);
    expect(res.statusCode).toEqual(200);
  });

  it("Deve retornar os campos obrigatórios do usuário encontrado", async () => {
    const res = await request(app).get(`/api/visitantes/${idToTestFindById}/`);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });
});

describe("/POST /name create()", () => {
  it("Deve criar o usuário e retornar ele em json", async () => {
    const res = await request(app).post("/api/visitantes/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 201", async () => {
    const res = await request(app).post("/api/visitantes/").send({
      name: "UsuarioTeste",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("Deve retornar campos obrigatórios do usuário criado", async () => {
    const res = await request(app).post("/api/visitantes/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });

  it("Deve retornar 400 se nao for enviado campo necessário", async () => {
    const res = await request(app).post("/api/visitantes/").send({});
    expect(res.statusCode).toEqual(400);
  });
});

describe("/PATCH /name update()", () => {
  it("Deve alterar o nome do usuário informado no id", async () => {
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
  });

  it("Deve retornar statusCode 200", async () => {
    const previousUser = await prismaClient.visitante.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/visitantes/${id}`).send({
      name: "afterUpdate",
    });
    expect(res.statusCode).toBe(200);
  });

  it("Deve permitir modificação apenas nos campos informados", async () => {
    const previousUser = await prismaClient.visitante.findFirst({
      where: {
        name: "beforeUpdate",
      },
    });
    const { id } = previousUser;

    const res = await request(app).patch(`/api/visitantes/${id}`).send({});
    expect(res.statusCode).toBe(200);
  });
});

describe("/DEL /name:id delete()", () => {
  it("Deve deletar o usuário informado no id", async () => {
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
