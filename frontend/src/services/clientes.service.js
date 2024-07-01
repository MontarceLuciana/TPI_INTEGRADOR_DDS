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

async function BuscarPorId(id) {
  const resp = await httpService.get(urlResource + "/" + id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdCliente);
}


async function Eliminar(id) {
  console.log(urlResource + "/" + id);
  await httpService.delete(urlResource + "/" + id);
  
}

async function Grabar(item) {
  if (item.IdCliente) {
    await httpService.put(urlResource + "/" + item.IdCliente, {
      Nombre: item.Nombre,
      Email: item.Email,
      Telefono: item.Telefono
    });
  } else {
    await httpService.post(urlResource, {
      Nombre: item.Nombre,
      Email: item.Email,
      Telefono: item.Telefono
    });
  }
}



export const clientesService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Eliminar,
  Grabar,
};
