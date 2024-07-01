const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// Obtener todas las reservas
router.get("/api/reservas", async function (req, res, next) {
  let data = await db.Reservas.findAll({
    attributes: ["IdReserva", "Cliente", "Fecha", "Habitacion"],
  });
  res.json(data);
});

// Obtener una reserva por id
router.get("/api/reservas/:id", async function (req, res, next) {
  let data = await db.Reservas.findAll({
    attributes: ["IdReserva", "Cliente", "Fecha", "Habitacion"],
    where: { IdReserva: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
