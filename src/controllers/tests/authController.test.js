const request = require("supertest");
const app = require("../../app.js");
const { prismaClient } = require("../../app/db/prisma/prismaClient.js");

beforeAll(async () => {
  const createTestUser = await prismaClient.user.create({
    data: {
      name: "testUserForAuth",
      email: "authtest@authtest.com",
      password: "123456",
    },
  });
});

afterAll(async () => {
  const deleteTestUser = await prismaClient.user.deleteMany({
    where: {
      name: "testUserForAuth",
    },
  });
});

describe("/POST /auth login()", () => {
  test("Deve autenticar usuário e retornar status 200", async () => {
    const res = await request(app).post("/auth/").send({
      email: "authtest@authtest.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(200);
  });
});
