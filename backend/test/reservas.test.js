// Test GET /api/reservas
describe("GET /api/reservas", () => {
    it("Debería devolver todas las reservas", async () => {
      const res = await request(app).get("/api/reservas");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdReserva: expect.any(Number),
            Cliente: expect.any(String),
            Fecha: expect.any(String),
            Habitacion: expect.any(String),
          }),
        ])
      );
    });
  });
  
  // Test GET /api/reservas/:id
  describe("GET /api/reservas/:id", () => {
    it("Debería devolver la reserva con el id especificado", async () => {
      const res = await request(app).get("/api/reservas/1"); // Reemplaza con un id válido
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdReserva: expect.any(Number),
          Cliente: expect.any(String),
          Fecha: expect.any(String),
          Habitacion: expect.any(String),
        })
      );
    });
  
    it("Debería devolver 404 si la reserva no existe", async () => {
      const res = await request(app).get("/api/reservas/999"); // Id no existente
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          mensaje: "No encontrado!!",
        })
      );
    });
  });
  
  // Añadir más tests para POST, PUT, DELETE según sea necesario
  
  