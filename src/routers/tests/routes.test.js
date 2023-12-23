const UserController = require("../../controllers/userController.js");
const VisitanteController = require("../../controllers/visitanteController.js");
const VisitaController = require("../../controllers/visitaController.js");
const AuthController = require("../../controllers/authController.js");

const userController = new UserController();
const visitanteController = new VisitanteController();
const visitaController = new VisitaController();
const authController = new AuthController();

describe("Testa a existência dos métodos do UserController", () => {
  test("Mostrar existência do método findOne", () => {
    expect(userController.findOne).toBeDefined();
  });

  test("Mostrar existência do método findAll", () => {
    expect(userController.findAll).toBeDefined();
  });

  test("Mostrar existência do método create", () => {
    expect(userController.create).toBeDefined();
  });

  test("Mostrar existência do método update", () => {
    expect(userController.update).toBeDefined();
  });

  test("Mostrar existência do método delete", () => {
    expect(userController.delete).toBeDefined();
  });
});

describe("Testa a existência dos métodos do VisitanteController", () => {
  test("Mostrar existência do método findOne", () => {
    expect(visitanteController.findOne).toBeDefined();
  });

  test("Mostrar existência do método findAll", () => {
    expect(visitanteController.findAll).toBeDefined();
  });

  test("Mostrar existência do método create", () => {
    expect(visitanteController.create).toBeDefined();
  });

  test("Mostrar existência do método update", () => {
    expect(visitanteController.update).toBeDefined();
  });

  test("Mostrar existência do método delete", () => {
    expect(visitanteController.delete).toBeDefined();
  });
});

describe("Testa a existência dos métodos do VisitaController", () => {
  test("Mostrar existência do método findOne", () => {
    expect(visitaController.findOne).toBeDefined();
  });

  test("Mostrar existência do método findAll", () => {
    expect(visitaController.findAll).toBeDefined();
  });

  test("Mostrar existência do método create", () => {
    expect(visitaController.create).toBeDefined();
  });

  test("Mostrar existência do método update", () => {
    expect(visitaController.update).toBeDefined();
  });

  test("Mostrar existência do método delete", () => {
    expect(visitaController.delete).toBeDefined();
  });
});

describe("Testa a existência dos métodos do AuthController", () => {
  test("Mostrar existência do método findOne", () => {
    expect(authController.login).toBeDefined();
  });
});
