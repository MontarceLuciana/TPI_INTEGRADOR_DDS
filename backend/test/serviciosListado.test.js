const request = require("supertest");
const app = require("../index");

describe("GET /api/serviciosListado", function () {
  it("Devolveria todos los serviciosListado", async function () {
    const res = await request(app)
      .get("/api/serviciosListado")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdServiciosListado: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/serviciosListado/:id", function () {
  it("respond with json containing a single serviciosListado", async function () {
    const res = await request(app)
      .get("/api/serviciosListado/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdServiciosListado: 1,
        Nombre: expect.any(String),
      })
    );
  });
});
