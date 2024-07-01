import React, { useState, useEffect } from 'react';
//import { EventosService } from '../../services/eventos.service';
import { EventosService } from '../services/eventos.service';

import arrayEventos from '../datos-mock/eventos-mock';

function Eventos() {
  const [eventos, setEventos] = useState(null);

  useEffect(() => {
    BuscarEventos();
  }, []);

  async function BuscarEventos() {
    try {
      let data = await EventosService.Buscar();
      setEventos(data);
    } catch (error) {
      console.error('Error al buscar eventos:', error);
    }
  }

  return (
    <div>
      <h1>Eventos</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>IdEventos</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Capacidad Máxima</th>
          </tr>
        </thead>
        <tbody>
          {eventos &&
            eventos.map((evento) => (
              <tr key={evento.IdEventos}>
                <td>{evento.IdEventos}</td>
                <td>{evento.Nombre}</td>
                <td>{evento.Descripcion}</td>
                <td>{evento.CapacidadMaxima}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Eventos;
