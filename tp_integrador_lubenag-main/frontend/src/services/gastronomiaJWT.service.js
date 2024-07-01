import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceGastronomiaJWT

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdGastronomia);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdGastronomia);
}


async function Grabar(item) {
  if (item.IdGastronomia === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdGastronomia, item);
  }
}


export const gastronomiaJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
