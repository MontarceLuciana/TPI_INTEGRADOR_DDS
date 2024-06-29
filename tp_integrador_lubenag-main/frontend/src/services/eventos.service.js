import axios from "axios";

//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulosfamilias";
import {config} from "../config";
const urlResource = config.urlResourceEventos;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const EventosService = {
  Buscar
};
