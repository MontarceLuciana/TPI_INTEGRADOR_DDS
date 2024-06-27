// Importar el arreglo mock de habitaciones (o artículos de familia)
import arrayServiciosListado from '../datos-mock/serviciosListado-mock';

// Función asíncrona para buscar todas las habitaciones (simula consulta a base de datos)
async function Buscar() {
    return arrayServiciosListado.find((serviciosListado) => serviciosListado.IdServiciosListado === IdServicioListado);;
}

// Función asíncrona para buscar habitaciones por ID
async function BuscarPorId(IdServiciosListado) {
    return arrayServiciosListado.find((serviciosListado) => serviciosListado.IdServiciosListado === IdServiciosListado);
}

// Función asíncrona para agregar una nueva habitación
async function Agregar(serviciosListado) {
    serviciosListado.IdServicioListado = arrayServiciosListado.length + 1;  // Simula autoincremental
    arrayServiciosListado.push(serviciosListado);
}

// Función asíncrona para modificar una habitación existente
async function Modificar(serviciosListado) {
    let serviciosListadoEncontrado = arrayServiciosListado.find((serviciosListadofind) => serviciosListadofind.IdServiciosListado === serviciosListado.IdServicioListado);
    if (serviciosListadoEncontrado) {
        serviciosListadoEncontrado.Nombre = serviciosListado.Nombre;
    }
}

// Función asíncrona para eliminar una habitación por su Id
async function Eliminar(IdServiciosListado) {
    let serviciosListadoEncontrado = arrayServiciosListado.find((serviciosListadofind) => serviciosListadofind.IdServiciosListado === IdServiciosListado);
    if (serviciosListadoEncontrado) {
        arrayServiciosListado.splice(arrayServiciosListado.indexOf(serviciosListadoEncontrado), 1);
    }
}

// Exportar el servicio con todas las funciones definidas
export const serviciosListadoMockService = {
    Buscar,
    BuscarPorId,
    Agregar,
    Modificar,
    Eliminar
};
