// tareas.service.js
import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlResourceTareas;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(id) {
  const resp = await httpService.get(urlResource + "/" + id);
  return resp.data;
}

async function Eliminar(id) {
  await httpService.delete(urlResource + "/" + id);
}

async function Grabar(item) {
  if (item.IdTarea === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdTarea, item);
  }
}

export const tareasService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar,
};
