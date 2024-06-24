// src/components/ServiciosListado.jsx
import React, { useState, useEffect } from 'react';
import { servicioListadoService } from '../services/serviciosListado.service';
import arrayServiciosListado from '../datos-mock/serviciosListado-mock';

function ServiciosListado() {
  const tituloPagina = 'Servicios Listado';
  const [serviciosListado, setServiciosListado] = useState(arrayServiciosListado);

  useEffect(() => {
    BuscarServicioListado();
  }, []);

  async function BuscarServicioListado() {
    try {
      let data = await servicioListadoService.Buscar();
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
            serviciosListado.map((servicio) => (
              <tr key={servicio.IdServiciosListado}>
                <td>{servicio.IdServiciosListado}</td>
                <td>{servicio.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiciosListado;
