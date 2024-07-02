// src/config.js
const urlServidor = "http://localhost:4000"; // Ajusta según tu entorno

const urlResourceGastronomia = urlServidor + "/api/gastronomia";
const urlResourceGastronomiaJWT = urlServidor + "/api/gastronomiajwt";
const urlResourceEventos = urlServidor + "/api/eventos";

const urlResourceClientes = urlServidor + "/api/clientes";
const urlResourceClientesJWT = urlServidor + "/api/clientesjwt";
const urlResourceReservas = urlServidor + "/api/reservas";
const urlResourceEmpleados = urlServidor + "/api/empleados"; // URL para empleados
const urlResourceTareas = urlServidor + "/api/tareas"; // URL para tareas

export const config = {
    urlServidor,
    urlResourceGastronomia,
    urlResourceGastronomiaJWT,
    urlResourceEventos,
    urlResourceClientes,
    urlResourceReservas,
    urlResourceClientesJWT,
    urlResourceEmpleados, // Agregado para empleados
    urlResourceTareas, // Agregado para tareas
};
