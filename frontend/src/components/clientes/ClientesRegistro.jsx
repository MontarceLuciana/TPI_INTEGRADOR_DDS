import React from "react";
import { useForm } from "react-hook-form";

export default function ClientesRegistro({
  AccionABMC,
  Grabar,
  Volver,
  Item,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({
    defaultValues: Item,
  });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row mb-3">
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
                    value: 1,
                    message: "Nombre debe tener al menos 1 caracter",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={"form-control " + (errors?.Nombre ? "is-invalid" : "")}
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Email */}
          <div className="row mb-3">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Email">
                Email<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("Email", {
                  required: { value: true, message: "Email es requerido" },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Formato de Email inválido",
                  },
                })}
                className={"form-control " + (errors?.Email ? "is-invalid" : "")}
              />
              {errors?.Email && touchedFields.Email && (
                <div className="invalid-feedback">
                  {errors?.Email?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Telefono */}
          <div className="row mb-3">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Telefono">
                Teléfono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="tel"
                {...register("Telefono", {
                  required: { value: true, message: "Teléfono es requerido" },
                  minLength: {
                    value: 7,
                    message: "Teléfono debe tener al menos 7 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "Teléfono debe tener como máximo 15 caracteres",
                  },
                })}
                className={"form-control " + (errors?.Telefono ? "is-invalid" : "")}
              />
              {errors?.Telefono && touchedFields.Telefono && (
                <div className="invalid-feedback">
                  {errors?.Telefono?.message}
                </div>
              )}
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

        {/* texto: Revisar los datos ingresados... */}
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
