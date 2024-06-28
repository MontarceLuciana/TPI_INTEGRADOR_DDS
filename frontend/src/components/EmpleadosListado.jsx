// src/components/Empleados.jsx
import React, { useState, useEffect } from 'react';
import { empleadosService } from '../services/empleados.service';
import arrayEmpleados from '../datos-mock/empleados-mock';

function Empleados() {
  const tituloPagina = 'Lista de Empleados';
  const [empleados, setEmpleados] = useState(arrayEmpleados);

  useEffect(() => {
    buscarEmpleados();
  }, []);

  async function buscarEmpleados() {
    try {
      let data = await empleadosService.buscar();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al buscar empleados:', error);
    }
  }

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>IdEmpleado</th>
            <th style={{ width: '40%' }}>Nombre</th>
            <th style={{ width: '20%' }}>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {empleados &&
            empleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td>{empleado.IdEmpleado}</td>
                <td>{empleado.Nombre}</td>
                <td>{empleado.Cargo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export { Empleados };
