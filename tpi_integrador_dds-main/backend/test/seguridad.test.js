const request = require("supertest");
const app = require("../index");

const usuarioAdmin = { usuario: "admin", clave: "123" };
const usuarioMiembro = { usuario: "juan", clave: "123" };


describe("POST /api/login admin", function () {
  it("Devolveria error de autenticacion, porque tiene clave errónea", async function () {
    const res = await request(app)
      .post("/api/login")
      //.set("Content-type", "application/json")
      .send({ usuario: "admin", clave: "errónea" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("usuario or clave incorrecto");
  });

  it("Devolvería el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioAdmin);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });
});

describe("GET /api/habitacionesJWT", () => {

  it("Devolveria error, porque falta token de autorización", async function () {
    const res = await request(app).get("/api/habitacionesJWT");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Acceso denegado");
  });

  it("Devolveria error, porque el token no es válido", async function () {
    const res = await request(app).get("/api/habitacionesJWT")
    .set("Authorization", 'Bearer invalido');
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual("token no es valido");
  });

  it("Devolvería todos las habitaciones, solo autorizado para administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioAdmin);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/habitacionesJWT")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdHabitaciones: expect.any(Number),
          Nombre: expect.any(String),
          FechaIngreso: expect.any(String),
          IdServiciosListado: expect.any(Number),
        }),
      ])
    );
  });

  it("Devolvería error de autorizacion, porque solo están autorizados los administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioMiembro);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/habitacionesJWT")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('usuario no autorizado!');
  });

});