// src/config.js
const urlServidor = "http://localhost:3001"; // Ajusta según tu entorno

const urlResourceArticulos = urlServidor + "/api/articulos";
const urlResourceArticulosFamilias = urlServidor + "/api/articulosfamilias";
const urlResourceArticulosJWT = urlServidor + "/api/articulosjwt";
const urlResourceServiciosListado = urlServidor + "/api/serviciosListado";

export const config = {
    urlServidor,
    urlResourceArticulos,
    urlResourceArticulosFamilias,
    urlResourceArticulosJWT,
    urlResourceServiciosListado,
};
