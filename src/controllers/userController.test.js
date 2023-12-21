const request = require("supertest");
const app = require("../app.js");
const prismaCliente = require("../app/db/prisma/prismaClient.js");

describe("/GET /users findAll", () => {
  test("Retorna lista de usuários e statuscode 200", async () => {
    const res = await request(app).get("/api/users/");
    expect(res.statusCode).toEqual(200);
  });
});
