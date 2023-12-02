const request = require("supertest");
const app = require("../app.js");
const router = require("../routers/routes.js");

// Testes de existência dos métodos executados pelo Controller

const NameController = require("../controllers/nameController.js");
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
    expect(nameController.delete).toBeDefined();
  });
});

// Teste das requisicoes

describe("/GET /name findAll()", () => {
  it("Deve localizar todos os modelos na rota", async () => {
    const res = await request(app).get("/name/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET /name/:id findOne()", () => {
  it("Deve localizar todos os modelos na rota", async () => {
    const res = await request(app).get(
      "/name/74a247a6-dc40-4d48-8368-e41333b35aac"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("edison");
  });
});
