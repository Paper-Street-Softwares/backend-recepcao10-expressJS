const request = require("supertest");
const app = require("../app.js");

const NameController = require("../controllers/nameController.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const nameController = new NameController();

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
});

// Testes de existência dos métodos executados pelo Controller

describe("Test de nameController", () => {
  it("Verifica se método findOne está definida", () => {
    expect(nameController.findOne).toBeDefined();
  });

  it("Verifica se método findAll está definida", () => {
    expect(nameController.findAll).toBeDefined();
  });

  it("Verifica se método create está definida", () => {
    expect(nameController.create).toBeDefined();
  });

  it("Verifica se método update está definida", () => {
    expect(nameController.update).toBeDefined();
  });

  it("Verifica se método delete está definida", () => {
    expect(nameController.findOne).toBeDefined();
  });
});

// Teste das requisicoes

describe("/GET /name findAll()", () => {
  it("Retorna statusCode 200", async () => {
    const res = await request(app).get("/name/");
    expect(res.statusCode).toEqual(200);
  });
});

// TESTE DE ROTA: /GET /name:id findOne()

describe("/GET /name:id findOne()", () => {
  it("Deve encontrar o usuário pelo id e retornar ele em json", async () => {
    const res = await request(app).get(
      "/name/74a247a6-dc40-4d48-8368-e41333b35aac/"
    );
    expect(res.body.name).toBe("edison");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 200", async () => {
    const res = await request(app)
      .get("/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
      .send({
        name: "jose",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("Deve retornar os campos obrigatórios do usuário encontrado", async () => {
    const res = await request(app)
      .get("/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
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
    const res = await request(app).post("/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar statusCode 201", async () => {
    const res = await request(app).post("/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("Deve retornar campos obrigatórios do usuário criado", async () => {
    const res = await request(app).post("/name/").send({
      name: "UsuarioTeste",
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });
});
