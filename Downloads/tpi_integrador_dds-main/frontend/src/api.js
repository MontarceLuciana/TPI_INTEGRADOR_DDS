// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Asegúrate de que el backend esté corriendo en este puerto
});

export default api;
