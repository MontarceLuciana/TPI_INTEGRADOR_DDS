const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Obtener todos los clientes
router.get("/api/clientes", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Clientes.findAndCountAll({
    attributes: ["IdCliente", "Nombre", "Email", "Telefono"],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});

// Obtener un cliente por id
router.get("/api/clientes/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    let cliente = await db.Clientes.findOne({
      where: { IdCliente: id },
      attributes: ["IdCliente", "Nombre", "Email", "Telefono"],
    });
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Buscar clientes por nombre
router.get("/api/clientes/buscar", async function (req, res, next) {
  try {
    let nombre = req.query.nombre ?? "";
    let clientes = await db.Clientes.findAll({
      where: {
        Nombre: {
          [Op.like]: "%" + nombre + "%",
        },
      },
      attributes: ["IdCliente", "Nombre", "Email", "Telefono"],
    });
    res.json(clientes);
  } catch (error) {
    console.error("Error al buscar los clientes:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});


// Agregar un nuevo cliente
router.post("/api/clientes", async (req, res) => {
  const startDay = new Date()
  const endDate = new Date(startDay.setDate(startDay.getDate() + 1))
  try {
    let data = await db.Clientes.create({
      Nombre: req.body.Nombre,
      Email: req.body.Email,
      Telefono: req.body.Telefono,
      IdReserva: 1,
    });
    res.status(200).json(data.dataValues); // Devolvemos el registro agregado
  } catch (err) {
    if (err instanceof ValidationError) {
      // Si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // Si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
})

// Actualizar un cliente
router.put("/api/clientes/:id", async (req, res) => {
  try {
    let cliente = await db.Clientes.findOne({
      where: { IdCliente: req.params.id },
    });
    console.log(cliente)
    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }
    cliente.Nombre = req.body.Nombre;
    cliente.Email = req.body.Email;
    cliente.Telefono = req.body.Telefono;
    await cliente.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // Si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // Si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

// Eliminar un cliente
router.delete("/api/clientes/:id", async (req, res) => {
  try {
    let filasBorradas = await db.Clientes.destroy({
      where: { IdCliente: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (err) {
    console.error("Error al eliminar el cliente:", err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});


module.exports = router;
