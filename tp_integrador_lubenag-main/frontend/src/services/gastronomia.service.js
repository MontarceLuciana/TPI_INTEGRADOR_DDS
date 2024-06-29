import httpService from "./http.service";
import {config} from "../config";

const urlResource = config.urlResourceGastronomia;


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

async function Eliminar(id) {
  console.log(urlResource + "/" + id);
  await httpService.delete(urlResource + "/" + id);
  
}

async function Grabar(item) {
  if (item.IdGastronomia === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdGastronomia, item);
  }
}


export const gastronomiaService = {
  Buscar,BuscarPorId,Eliminar,Grabar,
};