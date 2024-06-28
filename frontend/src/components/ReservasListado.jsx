import React, { useState, useEffect } from 'react';
import { reservasService } from '../services/reserva.service';
import arrayReservasMock from '../datos-mock/reservas-mock';

function ReservasListado() {
  const tituloPagina = 'ReservasListado';
  const [reservas, setReservas] = useState(arrayReservasMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReserva, setCurrentReserva] = useState(null);

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

  async function BuscarReservasPorNombre() {
    try {
      let data = await reservasService.BuscarPorNombre(searchTerm);
      setReservas(data);
    } catch (error) {
      console.error('Error al buscar reservas por nombre:', error);
    }
  }

  function handleAgregarClick() {
    setCurrentReserva(null);
    setIsModalOpen(true);
  }

  function handleEditarClick(reserva) {
    setCurrentReserva(reserva);
    setIsModalOpen(true);
  }

  async function handleEliminarClick(id) {
    try {
      await reservasService.Eliminar(id);
      BuscarReservas(); // Refresca la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
    }
  }

  function handleModalClose() {
    setIsModalOpen(false);
    BuscarReservas();
  }

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={BuscarReservasPorNombre}>Buscar</button>
        <button onClick={BuscarReservas}>Listar todo</button>
        <button onClick={handleAgregarClick}>Agregar</button>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>IdReserva</th>
            <th style={{ width: '25%' }}>Cliente</th>
            <th style={{ width: '20%' }}>Fecha</th>
            <th style={{ width: '20%' }}>Habitacion</th>
            <th style={{ width: '20%' }}>Acciones</th>
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
                <td>
                  <button onClick={() => handleEditarClick(reserva)}>Editar</button>
                  <button onClick={() => handleEliminarClick(reserva.IdReserva)}>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ReservaModal
          reserva={currentReserva}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

function ReservaModal({ reserva, onClose }) {
  const [cliente, setCliente] = useState(reserva ? reserva.Cliente : '');
  const [fecha, setFecha] = useState(reserva ? reserva.Fecha : '');
  const [habitacion, setHabitacion] = useState(reserva ? reserva.Habitacion : '');

  async function handleSave() {
    try {
      if (reserva) {
        // Editar reserva existente
        await reservasService.Editar(reserva.IdReserva, { Cliente: cliente, Fecha: fecha, Habitacion: habitacion });
      } else {
        // Agregar nueva reserva
        await reservasService.Agregar({ Cliente: cliente, Fecha: fecha, Habitacion: habitacion });
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar reserva:', error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{reserva ? 'Editar Reserva' : 'Agregar Reserva'}</h2>
        <form>
          <div>
            <label>Cliente</label>
            <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </div>
          <div>
            <label>Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label>Habitacion</label>
            <input type="text" value={habitacion} onChange={(e) => setHabitacion(e.target.value)} />
          </div>
          <button type="button" onClick={handleSave}>Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export { ReservasListado };
