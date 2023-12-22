const request = require("supertest");
const app = require("../../../app.js");

describe("/GET /doc Swagger", () => {
  test("Deve retornar text/html e statuscode 200", async () => {
    const res = await request(app).get("/doc/");

    expect(res.type).toEqual("text/html");
    expect(res.statusCode).toEqual(200);
  });
});
