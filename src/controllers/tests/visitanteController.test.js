const { prismaClient } = require("../../app/db/prisma/prismaClient.js");
const request = require("supertest");
const logger = require("../../app/logs/logger.js");
const app = require("../../app.js");
const VisitanteController = require("../visitanteController.js");

const visitanteController = new VisitanteController();
const idToTestFindById = "65808b8eeb9b0c4212971c64";

beforeEach(async () => {
  const findBeforeUpdate = await prismaClient.visitante.findFirst({
    where: {
      name: "beforeUpdate",
    },
  });

  if (!findBeforeUpdate) {
    createUpdateUser = await request(app).post("/api/visitantes/").send({
      name: "beforeUpdate",
      phone: "phone",
      address: "address",
      cityAndState: "cityAndState",
      age: 30,
      gender: "gender",
      religion: "religion",
      smallGroup: "smallGroup",
      bibleStudy: "bibleStudy",
    });

    const findToBeDeletedUser = await prismaClient.visitante.findFirst({
      where: {
        name: "ToBeDeletedUser",
      },
    });

    if (!findToBeDeletedUser) {
      createToBeDeletedUser = await request(app).post("/api/visitantes/").send({
        name: "ToBeDeletedUser",
        phone: "phone",
        address: "address",
        cityAndState: "cityAndState",
        age: 30,
        gender: "gender",
        religion: "religion",
        smallGroup: "smallGroup",
        bibleStudy: "bibleStudy",
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

describe("/POST /name create()", () => {
  it("Deve criar a entidade e retornar statusCode 201", async () => {
    const res = await request(app).post("/api/visitantes/").send({
      name: "UsuarioTeste",
      phone: "phone",
      address: "address",
      cityAndState: "cityAndState",
      age: 30,
      gender: "gender",
      religion: "religion",
      smallGroup: "smallGroup",
      bibleStudy: "bibleStudy",
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
