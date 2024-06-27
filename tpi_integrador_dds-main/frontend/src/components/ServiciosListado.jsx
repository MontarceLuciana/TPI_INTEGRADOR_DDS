// src/components/ServiciosListado.jsx
import React, { useState, useEffect } from 'react';
import { serviciosListadoService } from '../services/serviciosListado.service';
import arrayServiciosListado from '../datos-mock/serviciosListado-mock';

function ServiciosListado() {
  const tituloPagina = 'ServiciosListado';
  const [serviciosListado, setServiciosListado] = useState(arrayServiciosListado);

  useEffect(() => {
    BuscarServiciosListado();
  }, []);

  async function BuscarServiciosListado() {
    try {
      let data = await serviciosListadoService.Buscar();
      setServiciosListado(data);
    } catch (error) {
      console.error('Error al buscar servicios listado:', error);
    }
  }

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>IdServicioListado</th>
            <th style={{ width: '60%' }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {serviciosListado &&
            serviciosListado.map((serviciosListado) => (
              <tr key={serviciosListado.IdServiciosListado}>
                <td>{serviciosListado.IdServiciosListado}</td>
                <td>{serviciosListado.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export { ServiciosListado };
