const request = require("supertest");
const app = require("../../app.js");
const { prismaClient } = require("../../app/db/prisma/prismaClient.js");

let testUserID;

beforeAll(async () => {
  const createTestUser = await prismaClient.user.create({
    data: {
      name: "testUserFindOne",
      email: "testeuserfindone@email.com",
      password: "password2",
    },
  });

  testUserID = createTestUser.id;
});

afterAll(async () => {
  const deleteTestUserFindOne = await prismaClient.user.deleteMany({
    where: { name: "testUserFindOne" },
  });

  const deleteTestUserCreate = await prismaClient.user.deleteMany({
    where: { name: "testUserCreate" },
  });
});

describe("/GET api/users findAll", () => {
  test("Retorna lista de usuários e statuscode 200", async () => {
    const res = await request(app).get("/api/users/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/GET api/users findOne", () => {
  test("Retorna usuário pelo id e retorna statuscode 200", async () => {
    const res = await request(app).get(`/api/users/${testUserID}`);

    expect(res.statusCode).toEqual(200);
  });
});

describe("/POST api/users create", () => {
  test("Cria um usuário e retorna statuscode 200", async () => {
    const res = await request(app).post("/api/users/").send({
      name: "testUserCreate",
      email: "testuserpost@email.com",
      password: "password2",
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("/PATCH api/users", () => {
  test("Atualiza as informações do usuário e retorna statuscode 200", async () => {
    const res = await request(app).patch(`/api/users/${testUserID}`).send({
      name: "testUserFindOne",
      email: "email2@email.com",
      password: "password2",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("/DELETE api/users delete", () => {
  test("Apaga usuário pelo id e retorna statuscode 200", async () => {
    const res = await request(app).delete(`/api/users/${testUserID}`);

    expect(res.statusCode).toEqual(200);
  });
});
