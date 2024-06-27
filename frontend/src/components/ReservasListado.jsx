// src/components/ReservasListado.jsx
import React, { useState, useEffect } from 'react';
import { reservasService } from '../services/reservas.service';
import arrayReservasMock from '../datos-mock/reservas-mock';

function ReservasListado() {
  const tituloPagina = 'ReservasListado';
  const [reservas, setReservas] = useState(arrayReservasMock);

  useEffect(() => {
    BuscarReservas();
  }, []);

  async function BuscarReservas() {
    try {
      let data = await reservasService.Buscar();
      setReservas(data);
    } catch (error) {
      console.error('Error al buscar reservas:', error);
    }
  }

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>IdReserva</th>
            <th style={{ width: '30%' }}>Cliente</th>
            <th style={{ width: '20%' }}>Fecha</th>
            <th style={{ width: '30%' }}>Habitacion</th>
          </tr>
        </thead>
        <tbody>
          {reservas &&
            reservas.map((reserva) => (
              <tr key={reserva.IdReserva}>
                <td>{reserva.IdReserva}</td>
                <td>{reserva.Cliente}</td>
                <td>{reserva.Fecha}</td>
                <td>{reserva.Habitacion}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export { ReservasListado };
