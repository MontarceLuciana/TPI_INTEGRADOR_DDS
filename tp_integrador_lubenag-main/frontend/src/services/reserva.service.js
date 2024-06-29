import axios from "axios";
import { config } from "../config";

const urlResource = config.urlResourceReservas; // URL de la API de reservas

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function BuscarPorNombre(nombre) {
  const resp = await axios.get(`${urlResource}?nombre=${nombre}`);
  return resp.data;
}

async function Agregar(reserva) {
  const resp = await axios.post(urlResource, reserva);
  return resp.data;
}

async function Editar(id, reserva) {
  const resp = await axios.put(`${urlResource}/${id}`, reserva);
  return resp.data;
}

async function Eliminar(id) {
  const resp = await axios.delete(`${urlResource}/${id}`);
  return resp.data;
}

export const reservasService = {
  Buscar,
  BuscarPorNombre,
  Agregar,
  Editar,
  Eliminar,
};
