import React, { useState, useEffect } from "react";
import { habitacionesJWTService } from "../../services/habitacionesJWT.service";

function HabitacionesJWT() {
  const tituloPagina = "Habitaciones JWT (solo para administradores)";
  const [habitaciones, setHabitaciones] = useState(null); // Cambia a 'habitaciones'

  // Cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarHabitacionesJWT();
  }, []);

  async function BuscarHabitacionesJWT() {
    try {
      let data = await habitacionesJWTService.Buscar();
      setHabitaciones(data);
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
            <th style={{ width: "20%" }}>IdHabitaciones</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones &&
            habitaciones.map((habitacion) => (
              <tr key={habitacion.IdHabitaciones}>
                <td>{habitacion.IdHabitaciones}</td>
                <td>{habitacion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default HabitacionesJWT; // Exporta por defecto el componente HabitacionesJWT
