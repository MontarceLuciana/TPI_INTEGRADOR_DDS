const request = require("supertest");
const app = require("../index");

describe("GET /api/eventos", function () {
  it("Devolvería todos los eventos", async function () {
    const res = await request(app)
      .get("/api/eventos")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdEventos: expect.any(Number),
          Nombre: expect.any(String),
          Descripcion: expect.any(String),
          CapacidadMaxima: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/eventos/:id", function () {
  it("Responde con JSON conteniendo un solo evento", async function () {
    const res = await request(app)
      .get("/api/eventos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEventos: 1,
        Nombre: expect.any(String),
        Descripcion: expect.any(String),
        CapacidadMaxima: expect.any(String),
      })
    );
  });
});
