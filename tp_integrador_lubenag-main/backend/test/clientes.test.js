const request = require("supertest");
const app = require("../index"); // Asegúrate de importar correctamente tu aplicación Express

// Test GET /api/clientes
describe("GET /api/clientes", () => {
  it("Debería devolver todos los clientes", async () => {
    const res = await request(app).get("/api/clientes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCliente: expect.any(Number),
          Nombre: expect.any(String),
          Email: expect.any(String),
          Telefono: expect.any(String),
        }),
      ])
    );
  });
});

// Test GET /api/clientes/:id
describe("GET /api/clientes/:id", () => {
  it("Debería devolver el cliente con el id especificado", async () => {
    const res = await request(app).get("/api/clientes/1"); // Reemplaza con un id válido
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCliente: expect.any(Number),
        Nombre: expect.any(String),
        Email: expect.any(String),
        Telefono: expect.any(String),
      })
    );
  });

  it("Debería devolver 404 si el cliente no existe", async () => {
    const res = await request(app).get("/api/clientes/999"); // Id no existente
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        mensaje: "No encontrado!!",
      })
    );
  });
});

// Test POST /api/clientes
describe("POST /api/clientes", () => {
  it("Debería crear un nuevo cliente", async () => {
    const nuevoCliente = {
      Nombre: "Nuevo Cliente",
      Email: "nuevo@example.com",
      Telefono: "987654321",
    };
    const res = await request(app).post("/api/clientes").send(nuevoCliente);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCliente: expect.any(Number),
        Nombre: nuevoCliente.Nombre,
        Email: nuevoCliente.Email,
        Telefono: nuevoCliente.Telefono,
      })
    );
  });
});

// Test PUT /api/clientes/:id
describe("PUT /api/clientes/:id", () => {
  it("Debería actualizar el cliente con el id especificado", async () => {
    const clienteActualizado = {
      Nombre: "Cliente Actualizado",
      Email: "actualizado@example.com",
      Telefono: "123456789",
    };
    const res = await request(app)
      .put("/api/clientes/1") // Reemplaza con un id válido
      .send(clienteActualizado);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "cliente actualizado",
      })
    );
  });

  it("Debería devolver 404 si el cliente no existe para actualizar", async () => {
    const clienteActualizado = {
      Nombre: "Cliente Actualizado",
      Email: "actualizado@example.com",
      Telefono: "123456789",
    };
    const res = await request(app)
      .put("/api/clientes/999") // Id no existente
      .send(clienteActualizado);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "cliente no encontrado",
      })
    );
  });
});

// Test DELETE /api/clientes/:id
describe("DELETE /api/clientes/:id", () => {
  it("Debería eliminar el cliente con el id especificado", async () => {
    const res = await request(app).delete("/api/clientes/1"); // Reemplaza con un id válido
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "cliente eliminado",
      })
    );
  });

  it("Debería devolver 404 si el cliente no existe para eliminar", async () => {
    const res = await request(app).delete("/api/clientes/999"); // Id no existente
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "cliente no encontrado",
      })
    );
  });
});
