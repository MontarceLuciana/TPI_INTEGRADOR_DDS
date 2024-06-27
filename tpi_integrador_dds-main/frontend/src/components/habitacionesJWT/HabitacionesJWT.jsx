import React, { useState, useEffect } from "react";
import  {habitacionesJWTService}  from "../../services/habitacionesJWT.service";




function HabitacionesJWT() {
  const tituloPagina = "Habitaciones JWT (solo para admintradores)";
  const [habitaciones, setHabitaciones] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarHabitacionesJWT();
  }, []);


  async function BuscarHabitacionesJWT() {
     try {
      let data = await habitacionesJWTService.Buscar();
      setHabitaciones(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
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
          {articulos &&
            articulos.map((serviciosListado) => (
              <tr key={serviciosListado.IdServiciosListado}>
                <td>{serviciosListado.IdServiciosListado}</td>
                <td>{serviciosListado.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { HabitacionesJWT };


