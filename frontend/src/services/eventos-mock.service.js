import arrayEventos from '../datos-mock/eventos-mock';
async function Buscar() {
    return arrayEventos //.find((evento) => evento.IdEventos === IdEventos);;
}

async function BuscarPorId(IdEventos) {
    return arrayEventos.find((evento) => evento.IdEventos === IdEventos);
} 

async function Agregar(evento) {
    evento.IdEventos = arrayEventos.length + 1;  // Simula autoincremental
    arrayEventos.push(evento);
}

async function Modificar(evento) {
    let eventoEncontrado = arrayEventos.find((eventofind) => eventofind.IdEventos === evento.IdEventos);
    if (eventoEncontrado) {
        eventoEncontrado.Nombre = evento.Nombre;
    }
}

async function Eliminar(IdEventos) {
    let eventoEncontrado = arrayEventos.find((eventofind) => eventofind.IdEventos === IdEventos);
    if (eventoEncontrado) {
        arrayEventos.splice(arrayEventos.indexOf(eventoEncontrado), 1);
    }
}

export const eventosMockService = {
    Buscar,
    BuscarPorId,
    Agregar,
    Modificar,
    Eliminar
};