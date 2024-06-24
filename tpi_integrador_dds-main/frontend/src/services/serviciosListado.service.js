// src/services/serviciosListado.service.js
import axios from 'axios';
import { config } from '../config';

const { urlResourceServiciosListado } = config;

export const servicioListadoService = {
  Buscar
};

async function Buscar() {
  try {
    const response = await axios.get(urlResourceServiciosListado);
    return response.data;
  } catch (error) {
    console.error('Error al buscar servicios listado:', error);
    throw error;
  }
}
