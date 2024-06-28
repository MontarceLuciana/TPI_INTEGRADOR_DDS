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
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  }

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Nombre</th>
            <th style={{ width: '40%' }}>Apellido</th>
            <th style={{ width: '20%' }}>Puesto</th>
            <th style={{ width: '20%' }}>Fecha de Contratación</th>
          </tr>
        </thead>
        <tbody>
          {empleados &&
            empleados.map((empleado, index) => (
              <tr key={index}>
                <td>{empleado.Nombre}</td>
                <td>{empleado.Apellido}</td>
                <td>{empleado.Puesto}</td>
                <td>{empleado.FechaContratacion}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empleados;
