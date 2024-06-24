import httpService from "./http.service";
import {config} from "../config";
const urlResource = config.urlResourceServiciosListado;

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdServiciosListado);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdServiciosListado);
}

async function Grabar(item) {
  if (item.IdServiciosListado === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdServiciosListado, item);
  }
}

export const serviciosService = {
  Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
