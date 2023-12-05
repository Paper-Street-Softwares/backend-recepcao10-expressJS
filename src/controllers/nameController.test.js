const request = require("supertest");
const app = require("../app.js");
const router = require("../routers/routes.js");

// Testes de existência dos métodos executados pelo Controller

const NameController = require("../controllers/nameController.js");
const { prismaClient } = require("../app/db/prisma/prismaClient.js");
const nameController = new NameController();

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

describe("/GET /name:id findOne()", () => {
  it("Deve retornar statusCode 200", async () => {
    const res = await request(app)
      .get("/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
      .send({
        name: "jose",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("Deve encontrar o usuário pelo id", async () => {
    const res = await request(app).get(
      "/name/74a247a6-dc40-4d48-8368-e41333b35aac/"
    );
    expect(res.body.name).toBe("edison");
    expect(res.body.id).toBeDefined();
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Deve retornar o id, nome, updatedAt e createdAt do usuário encontrado", async () => {
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

  it("Deve retornar resposta em json", async () => {
    const res = await request(app)
      .get("/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
      .send({
        name: "jose",
      });
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("/POST /name create()", () => {
  it("Deve criar um usuário", async () => {
    const res = await request(app).post("/name").send({
      name: "NewName6",
    });

    const id = res.body.id;

    const deletedUser = prismaClient.testName.delete({
      where: {
        id,
      },
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
    return deletedUser;
  });

  //   it("Deve retornar statusCode 200", async () => {
  //     const res = await request(app).post("/name/").send({
  //       name: "nometeste",
  //     });

  //     expect(res.statusCode).toEqual(200);
  //   });

  //   it("Deve retornar o id, nome, updatedAt e createdAt do usuário criado", async () => {
  //     const res = await request(app).post("/name/").send({
  //       name: "anyname",
  //     });
  //     expect(res.body.id).toBeDefined();
  //     expect(res.body.name).toBeDefined();
  //     expect(res.body.createdAt).toBeDefined();
  //     expect(res.body.updatedAt).toBeDefined();
  //   });

  //   it("Deve retornar resposta em json", async () => {
  //     const res = await request(app)
  //       .get("/name/74a247a6-dc40-4d48-8368-e41333b35aac/")
  //       .send({
  //         name: "jose",
  //       });
  //     expect(res.headers["content-type"]).toEqual(
  //       expect.stringContaining("json")
  //     );
  //   });
});
