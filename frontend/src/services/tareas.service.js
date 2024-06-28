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
  console.log(urlResource + "/" + id);
  await httpService.delete(urlResource + "/" + id);
  
}

async function Grabar(item) {
  if (item.IdTarea) {
    await httpService.put(urlResource + "/" + item.IdTarea, { Descripcion: item.Nombre });
  } else {
    await httpService.post(urlResource, { Descripcion: item.Nombre });
  }
}

export const tareasService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar,
};
