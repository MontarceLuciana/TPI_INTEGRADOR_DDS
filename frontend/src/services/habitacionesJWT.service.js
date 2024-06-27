import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceHabitacionesJWT

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdHabitaciones);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdHabitaciones);
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
