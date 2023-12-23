const request = require("supertest");
const app = require("../../app.js");
const { prismaClient } = require("../../app/db/prisma/prismaClient.js");
const { hash, genSalt, bcrypt } = require("bcrypt");

let testUserSchema;

beforeAll(async () => {
  const passwordBeforeHash = "testpassword";

  const salt = await genSalt(10);
  const hashedPassword = await hash(passwordBeforeHash, salt);

  const createTestUser = await prismaClient.user.create({
    data: {
      name: "testUserForAuth",
      email: "authtest@authtest.com",
      password: hashedPassword,
    },
  });

  testUserSchema = createTestUser;
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
      password: "testpassword",
    });

    expect(res.statusCode).toEqual(200);
  });
});
