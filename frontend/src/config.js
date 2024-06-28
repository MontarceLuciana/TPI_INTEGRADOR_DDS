// src/config.js
const urlServidor = "http://localhost:4000"; // Ajusta según tu entorno

const urlResourceHabitaciones = urlServidor + "/api/habitaciones";
const urlResourceHabitacionesJWT = urlServidor + "/api/habitacionesjwt";
const urlResourceServiciosListado = urlServidor + "/api/serviciosListado";

const urlResourceClientes = urlServidor + "/api/clientes";
const urlResourceClientesJWT = urlServidor + "/api/clientesjwt"
const urlResourceReservas = urlServidor + "/api/reservas"

export const config = {
    urlServidor,
    urlResourceHabitaciones,
    urlResourceHabitacionesJWT,
    urlResourceServiciosListado,

    urlResourceClientes,
    urlResourceReservas,
    urlResourceClientesJWT,
};
