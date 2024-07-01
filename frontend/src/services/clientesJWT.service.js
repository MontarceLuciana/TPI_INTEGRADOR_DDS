// clientesJWT.service.js

import httpService from "./http.service";
import { config } from "../config";
import AuthService from "./auth.service";

const urlResource = config.urlResourceClientesJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
    headers: { Authorization: `Bearer ${AuthService.getCurrentToken()}` },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdCliente, {
    headers: { Authorization: `Bearer ${AuthService.getCurrentToken()}` },
  });
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdCliente, {
    headers: { Authorization: `Bearer ${AuthService.getCurrentToken()}` },
  });
}

async function Grabar(item) {
  const token = AuthService.getCurrentToken();
  if (item.IdCliente === 0) {
    await httpService.post(urlResource, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    await httpService.put(urlResource + "/" + item.IdCliente, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const clientesJWTService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
