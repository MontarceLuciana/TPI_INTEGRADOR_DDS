import React from "react";
import moment from "moment";

export default function GastronomiaListado({
  Items,
  Consultar,
  Modificar,
  Eliminar,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            
            <th className="text-center">Nombre</th>
            <th className="text-center">Descripción</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Fecha de Creacion</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((item) => (
              <tr key={item.Nombre}>
        
                <td>{item.Nombre}</td>
                <td>{item.Descripcion}</td>
                <td>{item.Precio}</td>
                <td className="text-end">
                  {moment(item.FechaCreacion).format("DD/MM/YYYY")}
                </td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(item)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Página: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
