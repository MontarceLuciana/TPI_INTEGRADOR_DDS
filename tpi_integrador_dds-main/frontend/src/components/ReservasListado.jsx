// src/components/ReservasListado.jsx

import React, { useState, useEffect } from 'react';
import { reservaService } from '../services/reserva.service';
import { clienteService } from '../services/cliente.service';

function ReservasListado() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);

  useEffect(() => {
    buscarReservas();
    buscarClientes();
  }, []);

  async function buscarReservas() {
    try {
      let data = await reservaService.buscar();
      setReservas(data);
    } catch (error) {
      console.error('Error al buscar reservas:', error);
    }
  }

  async function buscarClientes() {
    try {
      let data = await clienteService.buscar();
      setClientes(data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  }

  async function agregarReserva(reserva) {
    try {
      let data = await reservaService.agregar(reserva);
      setReservas([...reservas, data]);
    } catch (error) {
      console.error('Error al agregar reserva:', error);
    }
  }

  async function actualizarReserva(reserva) {
    try {
      let data = await reservaService.actualizar(reserva);
      setReservas(reservas.map(r => r.id === data.id ? data : r));
      setReservaEditando(null);
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  }

  async function eliminarReserva(id) {
    try {
      await reservaService.eliminar(id);
      setReservas(reservas.filter(reserva => reserva.id !== id));
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
    }
  }

  return (
    <div>
      <h2>Listado de Reservas</h2>
      <ReservaForm
        reserva={reservaEditando}
        clientes={clientes}
        onSave={(reserva) => {
          if (reserva.id) {
            actualizarReserva(reserva);
          } else {
            agregarReserva(reserva);
          }
        }}
        onCancel={() => setReservaEditando(null)}
      />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Habitación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{clientes.find(cliente => cliente.id === reserva.clienteId)?.nombre}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.habitacion}</td>
              <td>
                <button onClick={() => setReservaEditando(reserva)}>Editar</button>
                <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReservaForm({ reserva, clientes, onSave, onCancel }) {
  const [formData, setFormData] = useState(reserva || { clienteId: '', fecha: '', habitacion: '' });

  useEffect(() => {
    setFormData(reserva || { clienteId: '', fecha: '', habitacion: '' });
  }, [reserva]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="clienteId"
        value={formData.clienteId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un Cliente</option>
        {clientes.map(cliente => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="habitacion"
        placeholder="Habitación"
        value={formData.habitacion}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {reserva && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default ReservasListado;