import React, { useState, useEffect } from "react";
import moment from "moment";

import { gastronomiaService } from "../../services/gastronomia.service";
import { EventosService } from "../../services/eventos.service";

import modalDialogService from "../../services/modalDialog.service";

import GastronomiaBuscar from "./GastronomiaBuscar";
import GastronomiaListado from "./GastronomiaListado";
import GastronomiaRegistro from "./GastronomiaRegistro";

function Gastronomia() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [Eventos, setEventos] = useState(null);

  useEffect(() => {
    async function BuscarEventos() {
      let data = await EventosService.Buscar();
      setEventos(data);
    }
    BuscarEventos();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }

    modalDialogService.BloquearPantalla(true);
    try {
      const data = await gastronomiaService.Buscar(Nombre, _pagina);
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
    }
    modalDialogService.BloquearPantalla(false);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await gastronomiaService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }
  function Modificar(item) {
    if (!item) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdGastronomia: 0,
      Nombre: "",
      Descripcion: "",
      Precio: "",
      FechaCreacion: moment(new Date()).format("DD/MM/YYYY"),
      IdEventos: "",
    });
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "¿Está seguro que desea eliminar esta tarea?",
      undefined,
      undefined,
      undefined,
      async () => {
        await gastronomiaService.Eliminar(item.IdGastronomia);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await gastronomiaService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Gastronomia <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <GastronomiaBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <GastronomiaListado
          {...{
            Items,
            Consultar,
            Modificar,
            Eliminar,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <GastronomiaRegistro
          {...{ AccionABMC, Eventos, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Gastronomia };

