// clientes.service.js

import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlResourceClientes;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdCliente);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdCliente);
}

async function Grabar(item) {
  if (item.IdCliente === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdCliente, item);
  }
}

export const clientesService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
