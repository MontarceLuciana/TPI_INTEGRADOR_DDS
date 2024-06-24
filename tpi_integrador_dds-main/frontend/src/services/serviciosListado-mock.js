// Importar el arreglo mock de habitaciones (o artículos de familia)
import arrayServiciosListado from '../datos-mock/serviciosListado-mock';

// Función asíncrona para buscar todas las habitaciones (simula consulta a base de datos)
async function Buscar() {
    return arrayServiciosListado;
}

// Función asíncrona para buscar una habitación por su Id
async function BuscarPorId(IdServicioListado) {
    return arrayServiciosListado.find((serviciosListado) => serviciosListado.IdServiciosListado === IdServicioListado);
}

// Función asíncrona para agregar una nueva habitación
async function Agregar(serviciosListado) {
    serviciosListado.IdServicioListado = arrayServiciosListado.length + 1;  // Simula autoincremental
    arrayServiciosListado.push(serviciosListado);
}

// Función asíncrona para modificar una habitación existente
async function Modificar(serviciosListado) {
    let index = arrayServiciosListado.findIndex((af) => af.IdServiciosListado === serviciosListado.IdServicioListado);
    if (index !== -1) {
        arrayServiciosListado[index].Nombre = serviciosListado.Nombre;
    }
}

// Función asíncrona para eliminar una habitación por su Id
async function Eliminar(IdServicioListado) {
    let index = arrayServiciosListado.findIndex((af) => af.IdServiciosListado === IdServicioListado);
    if (index !== -1) {
        arrayServiciosListado.splice(index, 1);
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
