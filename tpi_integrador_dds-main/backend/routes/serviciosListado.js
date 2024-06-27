const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/serviciosListado", async function (req, res, next) {
  let data = await db.ServiciosListado.findAll({
    attributes: ["IdServiciosListado", "Nombre"],
  });
  res.json(data);
});

router.get("/api/serviciosListado/:id", async function (req, res, next) {
  // #swagger.tags = ['ServiciosListado']
  // #swagger.summary = 'obtiene un ServicioListado'
  // #swagger.parameters['id'] = { description: 'identificador del ServicioListado...' }
  let data = await db.ServiciosListado.findAll({
    attributes: ["IdServicioslistado", "Nombre"],
    where: { IdServiciosListado: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;