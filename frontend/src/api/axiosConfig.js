// axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Reemplaza con la URL base de tu API
  timeout: 5000, // Tiempo máximo de espera para las solicitudes (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
