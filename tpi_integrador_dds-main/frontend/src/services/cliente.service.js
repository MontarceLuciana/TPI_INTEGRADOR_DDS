// src/services/cliente.service.js

import arrayClientes from '../datos-mock/clientes-mock';

export const clienteService = {
  buscar: () => Promise.resolve(arrayClientes),
  agregar: (cliente) => {
    const nuevoCliente = { ...cliente, id: Date.now() };
    arrayClientes.push(nuevoCliente);
    return Promise.resolve(nuevoCliente);
  },
  actualizar: (clienteActualizado) => {
    const index = arrayClientes.findIndex(cliente => cliente.id === clienteActualizado.id);
    if (index > -1) {
      arrayClientes[index] = clienteActualizado;
    }
    return Promise.resolve(clienteActualizado);
  },
  eliminar: (id) => {
    const index = arrayClientes.findIndex(cliente => cliente.id === id);
    if (index > -1) {
      arrayClientes.splice(index, 1);
    }
    return Promise.resolve();
  },
};
