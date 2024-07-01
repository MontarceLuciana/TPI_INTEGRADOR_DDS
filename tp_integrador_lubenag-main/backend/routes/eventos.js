const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

router.get("/api/eventos", async function (req, res, next) {
  let data = await db.Eventos.findAll({
    attributes: ["IdEventos", "Nombre", "Descripcion", "CapacidadMaxima"],
  });
  res.json(data);
});

router.get("/api/eventos/:id", async function (req, res, next) {
  // #swagger.tags = ['Eventos']
  // #swagger.summary = 'obtiene un Evento'
  // #swagger.parameters['id'] = { description: 'identificador del Evento...' }
  let data = await db.Eventos.findOne({
    attributes: ["IdEventos", "Nombre", "Descripcion", "CapacidadMaxima"],
    where: { IdEventos: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "Evento no encontrado" });
});

module.exports = router;
