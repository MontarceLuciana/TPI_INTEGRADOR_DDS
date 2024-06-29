import React, { useState, useEffect } from "react";
import { clientesJWTService } from "../../services/clientesJWT.service";

function ClientesJWT() {
  const tituloPagina = "Clientes JWT (solo para administradores)";
  const [clientes, setClientes] = useState(null);

  // Cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarClientesJWT();
  }, []);

  async function BuscarClientesJWT() {
    try {
      let data = await clientesJWTService.Buscar();
      setClientes(data);
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
            <th style={{ width: "20%" }}>IdCliente</th>
            <th style={{ width: "50%" }}>Nombre</th>
            {/* Agrega más columnas según tus necesidades */}
          </tr>
        </thead>
        <tbody>
          {clientes &&
            clientes.map((cliente) => (
              <tr key={cliente.IdCliente}>
                <td>{cliente.IdCliente}</td>
                <td>{cliente.Nombre}</td>
                {/* Agrega más celdas según tus necesidades */}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export { ClientesJWT };
