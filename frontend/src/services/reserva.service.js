import axios from "axios";
import { config } from "../config";

const urlResource = config.urlResourceReservas; // URL de la API de reservas

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

// Otras funciones para agregar, modificar, eliminar reservas utilizando axios

export const reservasService = {
  Buscar,
  // Agregar, Modificar, Eliminar, etc.
};
