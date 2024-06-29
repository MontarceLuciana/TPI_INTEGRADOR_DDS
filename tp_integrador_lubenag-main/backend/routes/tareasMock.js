const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Datos de ejemplo para las tareas
const tareasMockData = [
  {
    IdTarea: 1,
    Descripcion: "Limpiar habitaciones",
    IdEmpleado: 1,
    FechaAsignacion: "2024-06-30",
    Completada: false,
  },
  {
    IdTarea: 2,
    Descripcion: "Revisar inventario",
    IdEmpleado: 2,
    FechaAsignacion: "2024-07-01",
    Completada: true,
  },
  // Agrega más tareas aquí si es necesario
];

// Obtener todas las tareas mock
router.get("/api/tareas/mock", async function (req, res, next) {
  res.json(tareasMockData);
});

// Obtener una tarea mock por ID
router.get("/api/tareas/mock/:id", async function (req, res, next) {
  const id = parseInt(req.params.id);
  const tarea = tareasMockData.find((t) => t.IdTarea === id);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ mensaje: "Tarea no encontrada" });
  }
});

module.exports = router;
