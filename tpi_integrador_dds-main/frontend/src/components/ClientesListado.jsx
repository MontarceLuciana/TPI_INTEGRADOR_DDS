// src/components/ClientesListado.jsx

import React, { useState, useEffect } from 'react';
import { clienteService } from '../services/cliente.service';

function ClientesListado() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      let data = await clienteService.buscar();
      setClientes(data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  }

  async function agregarCliente(cliente) {
    try {
      let data = await clienteService.agregar(cliente);
      setClientes([...clientes, data]);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  }

  async function actualizarCliente(cliente) {
    try {
      let data = await clienteService.actualizar(cliente);
      setClientes(clientes.map(c => c.id === data.id ? data : c));
      setClienteEditando(null);
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  }

  async function eliminarCliente(id) {
    try {
      await clienteService.eliminar(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  }

  return (
    <div>
      <h2>Listado de Clientes</h2>
      <ClienteForm
        cliente={clienteEditando}
        onSave={(cliente) => {
          if (cliente.id) {
            actualizarCliente(cliente);
          } else {
            agregarCliente(cliente);
          }
        }}
        onCancel={() => setClienteEditando(null)}
      />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => setClienteEditando(cliente)}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClienteForm({ cliente, onSave, onCancel }) {
  const [formData, setFormData] = useState(cliente || { nombre: '', email: '' });

  useEffect(() => {
    setFormData(cliente || { nombre: '', email: '' });
  }, [cliente]);

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
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {cliente && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default ClientesListado;
