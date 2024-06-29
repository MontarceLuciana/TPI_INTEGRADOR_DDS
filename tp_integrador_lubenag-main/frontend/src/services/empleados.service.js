import axios from "axios";
import { config } from "../config";

const urlResource = config.urlResourceEmpleados; // Asegúrate de tener esta configuración en tu archivo de configuración

async function Buscar() {
  try {
    const resp = await axios.get(urlResource);
    return resp.data;
  } catch (error) {
    console.error("Error al buscar empleados:", error);
    throw error; // Puedes manejar el error aquí o lanzarlo para que lo manejen desde donde se llama a esta función
  }
}

// Puedes agregar más funciones para realizar otras operaciones CRUD con los empleados si es necesario

export const empleadosService = {
  Buscar,
  // Otras funciones CRUD según sea necesario
};
