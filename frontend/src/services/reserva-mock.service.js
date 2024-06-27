import arrayReservasMock from "../datos-mock/reservas-mock";

async function Buscar() {
  return arrayReservasMock; // Simulación de datos mock de reservas
}

// Otras funciones para agregar, modificar, eliminar reservas utilizando datos mock

export const reservasMockService = {
  Buscar,
  // Agregar, Modificar, Eliminar, etc.
};
