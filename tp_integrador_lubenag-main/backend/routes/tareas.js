const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Obtener todas las tareas con filtros y paginación
router.get("/api/tareas", async function (req, res, next) {
  let where = {};
  if (req.query.Descripcion != undefined && req.query.Descripcion !== "") {
    where.Descripcion = {
      [Op.like]: "%" + req.query.Descripcion + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Tareas.findAndCountAll({
    attributes: ["IdTarea", "Descripcion", "FechaInicio", "FechaFin", "IdEmpleado"],
    order: [["Descripcion", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

// Obtener una tarea por ID
router.get("/api/tareas/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    let tarea = await db.Tareas.findOne({
      where: { IdTarea: id },
      attributes: ["IdTarea", "Descripcion", "FechaInicio", "FechaFin", "IdEmpleado"],
    });
    if (tarea) {
      res.json(tarea);
    } else {
      res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Buscar tareas por descripción
router.get("/api/tareas/buscar", async function (req, res, next) {
  try {
    let descripcion = req.query.descripcion ?? "";
    let tareas = await db.Tareas.findAll({
      where: {
        Descripcion: {
          [Op.like]: "%" + descripcion + "%",
        },
      },
      attributes: ["IdTarea", "Descripcion", "FechaInicio", "FechaFin", "IdEmpleado"],
    });
    res.json(tareas);
  } catch (error) {
    console.error("Error al buscar las tareas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Agregar una nueva tarea
router.post("/api/tareas", async (req, res) => {
  const startDay = new Date()
  const endDate = new Date(startDay.setDate(startDay.getDate() + 1))
  try {
    let data = await db.Tareas.create({
      Descripcion: req.body.Descripcion,
      IdTarea: Math.round(Math.random() * 100000),
      IdEmpleado: 1,
      FechaInicio: startDay,
      FechaFin: endDate,
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
});

// Actualizar una tarea
router.put("/api/tareas/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    let tarea = await db.Tareas.findOne({
      where: { IdTarea: req.params.id },
    });
    console.log(tarea)
    if (!tarea) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }
    tarea.Descripcion = req.body.Descripcion;
    await tarea.save();
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

// Eliminar una tarea
router.delete("/api/tareas/:id", async (req, res) => {
  try {
    let filasBorradas = await db.Tareas.destroy({
      where: { IdTarea: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (err) {
    console.error("Error al eliminar la tarea:", err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

module.exports = router;
