import React from "react";
import { useForm } from "react-hook-form";

export default function GastronomiaRegistro({
  AccionABMC,
  Eventos,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* Campo Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* Campo Descripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Descripcion">
                Descripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Descripcion", {
                  required: {
                    value: true,
                    message: "Descripcion es requerido",
                  },
                  minLength: {
                    value: 4,
                    message: "Descripcion debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Descripcion debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                }
              />
              {errors?.Descripcion && touchedFields.Descripcion && (
                <div className="invalid-feedback">
                  {errors?.Descripcion?.message}
                </div>
              )}
            </div>
          </div>

          {/* Campo Precio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Precio">
                Precio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step=".01"
                {...register("Precio", {
                  required: { value: true, message: "Precio es requerido" },
                  min: {
                    value: 0.01,
                    message: "Precio debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Precio debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.Precio ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Precio?.message}</div>
            </div>
          </div>

          {/* Campo FechaCreacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaCreacion">
                Fecha de Creacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaCreacion", {
                  required: {
                    value: true,
                    message: "Fecha de creacion es requerida",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.FechaCreacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaCreacion?.message}
              </div>
            </div>
          </div>

          {/* Campo IdEventos */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdEventos">
                Evento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdEventos", {
                  required: { value: true, message: "Evento es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdEventos ? "is-invalid" : "")
                }
              >
                <option value="">Selecciona un evento</option>
                {Eventos &&
                  Eventos.map((evento) => (
                    <option value={evento.IdEventos} key={evento.IdEventos}>
                      {evento.Nombre}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdEventos?.message}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* Texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
