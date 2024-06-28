const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// Obtener todos los empleados
router.get("/api/empleados", async function (req, res, next) {
  try {
    let empleados = await db.Empleados.findAll({
      attributes: ["IdEmpleado", "Nombre", "Cargo"],
    });
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Obtener un empleado por ID
router.get("/api/empleados/:id", async function (req, res, next) {
  try {
    let empleado = await db.Empleados.findByPk(req.params.id, {
      attributes: ["IdEmpleado", "Nombre", "Cargo"],
    });
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

module.exports = router;
