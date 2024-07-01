import React, { useState, useEffect } from "react";
import moment from "moment";
import { clientesService } from "../../services/clientes.service";
import modalDialogService from "../../services/modalDialog.service";
import ClientesBuscar from "./ClientesBuscar";
import ClientesListado from "./ClientesListado";
import ClientesRegistro from "./ClientesRegistro";

function Clientes() {
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

  
  useEffect(() => {
    async function BuscarClientes() {
      modalDialogService.BloquearPantalla(true);
      const data = await clientesService.Buscar(Nombre, Pagina);
      modalDialogService.BloquearPantalla(false);
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    }

    BuscarClientes();
  }, [Nombre, Pagina]);


  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await clientesService.Buscar(Nombre, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await clientesService.BuscarPorId(item.IdCliente);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdCliente: 0,
      Nombre: "",
      Email: "",
      Telefono: "",
      // Agregar más campos según tu modelo de datos de cliente
    });
  }


async function Eliminar(item) {
    modalDialogService.Confirm(
      "¿Está seguro que desea eliminar este cliente?",
      undefined,
      undefined,
      undefined,
      async () => {
        await clientesService.Eliminar(item.IdCliente);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await clientesService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      "Cliente " + (AccionABMC === "A" ? "agregada" : "modificada") + " correctamente."
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }


/*useEffect(() => {
    Buscar();
  }, []);
*/

  return (
    <div>
      <div className="tituloPagina">
        Clientes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ClientesBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          //Apellido={Apellido}
          //setApellido={setApellido}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      
      {/* Tabla de resultados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ClientesListado
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
          No se encontraron clientes...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <ClientesRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}

    </div>
  );
}

export default Clientes;

/*{AccionABMC !== "L" && (
        <ClientesRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}ESTO VA ABAJO DEL FORMULARIO DE ALTA/MODIFICACION*/ 
