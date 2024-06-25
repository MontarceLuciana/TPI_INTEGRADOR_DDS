// src/services/reserva.service.js

import arrayReservas from '../datos-mock/reservas-mock';

export const reservaService = {
  buscar: () => Promise.resolve(arrayReservas),
  agregar: (reserva) => {
    const nuevaReserva = { ...reserva, id: Date.now() };
    arrayReservas.push(nuevaReserva);
    return Promise.resolve(nuevaReserva);
  },
  actualizar: (reservaActualizada) => {
    const index = arrayReservas.findIndex(reserva => reserva.id === reservaActualizada.id);
    if (index > -1) {
      arrayReservas[index] = reservaActualizada;
    }
    return Promise.resolve(reservaActualizada);
  },
  eliminar: (id) => {
    const index = arrayReservas.findIndex(reserva => reserva.id === id);
    if (index > -1) {
      arrayReservas.splice(index, 1);
    }
    return Promise.resolve();
  },
};