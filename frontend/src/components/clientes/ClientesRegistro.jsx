import React from "react";

export default function ClientesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset>
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", { required: true })}
                className="form-control"
                maxLength="50"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Apellido">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Apellido", { required: true })}
                className="form-control"
                maxLength="50"
              />
            </div>
          </div>

          {/* Agregar más campos según tu modelo de datos de cliente */}

          <div className="row">
            <div className="col text-center botones">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-save"> </i> Grabar
              </button>{" "}
              &nbsp;
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => Volver()}
              >
                <i className="fa fa-arrow-left"> </i> Volver
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
}
