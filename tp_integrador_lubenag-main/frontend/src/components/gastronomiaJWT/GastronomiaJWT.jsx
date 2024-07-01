import React, { useState, useEffect } from "react";
import { gastronomiaJWTService } from "../../services/gastronomiaJWT.service";

function GastronomiaJWT() {
  const tituloPagina = "Gastronomia JWT (solo para administradores)";
  const [gastronomia, setGastronomia] = useState(null); // Cambia a 'Gastronomia'

  // Cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarGastronomiaJWT();
  }, []);

  async function BuscarGastronomiaJWT() {
    try {
      let data = await gastronomiaJWTService.Buscar();
      setGastronomia(data);
    } catch (error) {
      console.log("Error al buscar datos en el servidor:", error);
    }
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>IdGastronomia</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {gastronomia &&
            gastronomia.map((habitacion) => (
              <tr key={habitacion.IdGastronomia}>
                <td>{habitacion.IdGastronomia}</td>
                <td>{habitacion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default GastronomiaJWT; // Exporta por defecto el componente GastronomiaJWT
