// src/config.js
const urlServidor = "http://localhost:3001"; // Ajusta según tu entorno

const urlResourceHabitaciones = urlServidor + "/api/habitaciones";
const urlResourceHabitacionesJWT = urlServidor + "/api/habitacionesjwt";
const urlResourceServiciosListado = urlServidor + "/api/serviciosListado";

export const config = {
    urlServidor,
    urlResourceHabitaciones,
    urlResourceHabitacionesJWT,
    urlResourceServiciosListado,
};
