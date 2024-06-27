const request = require("supertest");
const app = require("../index");
const libroAlta = {
  Nombre: "Habitaciones " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaIngreso: new Date().toISOString(),
  IdServiciosListado: 1,
  Precio: 100.00,
  Disponible: true,
};
const habitacionesModificacion = {
  IdHabitaciones: 1,
  Nombre: "Habitaciones " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaIngreso: new Date().toISOString(),
  IdServiciosListado: 1,
  Precio: 100.00,
  Disponible: true,
};

// test route/habitaciones GET
describe("GET /api/habitaciones", () => {
  it("Deberia devolver todos las habitaciones", async () => {
    const res = await request(app).get("/api/habitaciones");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdHabitaciones: expect.any(Number),
            Nombre: expect.any(String),
            FechaIngreso: expect.any(String),
            Precio: expect.any(Number),
            Disponible: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/habitaciones GET
describe("GET /api/habitaciones con filtros", () => {
  it("Deberia devolver las habitaciones según filtro ", async () => {
    const res = await request(app).get("/api/habitaciones?Nombre=Simple&Pagina=1"); //Nombre d ealgo de su lista primaria - habitaciones
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Simple") ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/habitaciones/:id GET
describe("GET /api/habitaciones/:id", () => {
  it("Deberia devolver la habitacion con el id 1", async () => {
    const res = await request(app).get("/api/habitaciones/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdHabitaciones: expect.any(Number),
        Nombre: expect.any(String),
        FechaIngreso: expect.any(String),
        IdServiciosListado: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/habitaciones POST
describe("POST /api/habitaciones", () => {
  it("Deberia devolver la habitacion que acabo de crear", async () => {
    const res = await request(app).post("/api/habitaciones").send(habitacionesAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdHabitaciones: expect.any(Number),
        Nombre: expect.any(String),
        FechaIngreso: expect.any(String),
        IdServiciosListado: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/habitaciones/:id PUT
describe("PUT /api/habitaciones/:id", () => {
  it("Deberia devolver la habitacion con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/habitaciones/1")
      .send(habitacionesModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/habitaciones/:id DELETE
describe("DELETE /api/habitaciones/:id", () => {
  it("Debería devolver la habitacion con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/habitaciones/1");
    expect(res.statusCode).toEqual(200);

  });
});
