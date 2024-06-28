import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Importa Axios

export default function ClientesRegistro({ Grabar, Volver }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    try {
      // Realiza la solicitud POST a tu API usando Axios
      const response = await axios.post("url_de_tu_api", data); // Reemplaza 'url_de_tu_api' con la URL real de tu API
      console.log("Respuesta del servidor:", response.data);
      Grabar(data); // Llama a la función Grabar después de la solicitud exitosa
    } catch (error) {
      console.error("Error al enviar datos:", error.message);
    }
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
