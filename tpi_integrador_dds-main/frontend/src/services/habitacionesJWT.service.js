import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceHabitacionesJWT







async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdHabitacion);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdHabiatcion);
}


async function Grabar(item) {
  if (item.IdHabitaciones === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdHabitaciones, item);
  }
}


export const habitacionesJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
