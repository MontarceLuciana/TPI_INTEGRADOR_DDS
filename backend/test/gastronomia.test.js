const request = require("supertest");
const app = require("../index");

const gastronomiaAlta = {
  Nombre: "Gastronomia " + (() => (Math.random() + 1).toString(36).substring(2)), // Genera un nombre aleatorio
  FechaIngreso: new Date().toISOString(),
  IdEventos: 1,
  Precio: 100.00,
  Descripcion: "Descripción del evento gastronómico",
};

const gastronomiaModificacion = {
  IdGastronomia: 1,
  Nombre: "Gastronomia " + (() => (Math.random() + 1).toString(36).substring(2)), // Genera un nombre aleatorio
  FechaIngreso: new Date().toISOString(),
  IdEventos: 1,
  Precio: 120.00,
  Descripcion: "Descripción modificada del evento gastronómico",
};

// Test para obtener todos los registros de gastronomía
describe("GET /api/gastronomia", () => {
  it("Debe devolver todos los registros de gastronomía", async () => {
    const res = await request(app).get("/api/gastronomia");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdGastronomia: expect.any(Number),
            Nombre: expect.any(String),
            FechaIngreso: expect.any(String),
            IdEventos: expect.any(Number),
            Precio: expect.any(Number),
            Descripcion: expect.any(String),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// Test para obtener registros de gastronomía con filtros
describe("GET /api/gastronomia con filtros", () => {
  it("Debe devolver los registros de gastronomía según el filtro de nombre", async () => {
    const res = await request(app).get("/api/gastronomia?Nombre=Simple&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);

    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].Nombre.includes("Simple")) {
          return false;
        }
      }
      return true;
    }
  });
});

// Test para obtener un registro de gastronomía por ID
describe("GET /api/gastronomia/:id", () => {
  it("Debe devolver el registro de gastronomía con el ID especificado", async () => {
    const res = await request(app).get("/api/gastronomia/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdGastronomia: expect.any(Number),
        Nombre: expect.any(String),
        FechaIngreso: expect.any(String),
        IdEventos: expect.any(Number),
        Precio: expect.any(Number),
        Descripcion: expect.any(String),
      })
    );
  });
});

// Test para crear un nuevo registro de gastronomía
describe("POST /api/gastronomia", () => {
  it("Debe devolver el registro de gastronomía recién creado", async () => {
    const res = await request(app).post("/api/gastronomia").send(gastronomiaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdGastronomia: expect.any(Number),
        Nombre: expect.any(String),
        FechaIngreso: expect.any(String),
        IdEventos: expect.any(Number),
        Precio: expect.any(Number),
        Descripcion: expect.any(String),
      })
    );
  });
});

// Test para actualizar un registro de gastronomía por ID
describe("PUT /api/gastronomia/:id", () => {
  it("Debe devolver el estado 204 indicando que el registro de gastronomía fue modificado", async () => {
    const res = await request(app)
      .put("/api/gastronomia/1")
      .send(gastronomiaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// Test para eliminar un registro de gastronomía por ID
describe("DELETE /api/gastronomia/:id", () => {
  it("Debe devolver el estado 200 indicando que el registro de gastronomía fue eliminado", async () => {
    const res = await request(app).delete("/api/gastronomia/1");
    expect(res.statusCode).toEqual(200);
  });
});
