const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// Obtener todos los clientes
router.get("/api/clientes", async function (req, res, next) {
  let data = await db.Clientes.findAll({
    attributes: ["IdCliente", "Nombre", "Email", "Telefono"],
  });
  res.json(data);
});

// Obtener un cliente por id
router.get("/api/clientes/:id", async function (req, res, next) {
  let data = await db.Clientes.findAll({
    attributes: ["IdCliente", "Nombre", "Email", "Telefono"],
    where: { IdCliente: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
