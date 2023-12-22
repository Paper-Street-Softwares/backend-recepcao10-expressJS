const request = require("supertest");
const app = require("../../app.js");

describe("/POST /auth login()", () => {
  test("Deve autenticar usuário e retornar status 200", async () => {
    const res = await request(app).post("/auth/");

    expect(res.statusCode).toEqual(200);
  });
});
