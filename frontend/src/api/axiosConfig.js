import axios from 'axios';

async function Buscar() {
  try {
    const response = await axios.get('http://localhost:4000'); // Asegúrate de reemplazar con tu URL real
    console.log(response); // Verifica la estructura completa de la respuesta
    if (response && response.status === 200) {
      console.log(response.data); // Accede a los datos si la respuesta es válida
    } else {
      console.error('Error: Respuesta inválida o código de estado no 200');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.status);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
  }
}
