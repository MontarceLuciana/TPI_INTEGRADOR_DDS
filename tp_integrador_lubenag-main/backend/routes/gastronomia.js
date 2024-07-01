const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-orm/sequelize-init");
const auth = require("../seguridad/auth");

router.get("/api/gastronomia", async function (req, res, next) {
  try {
    const { Nombre, Pagina } = req.query;
    const whereClause = {};

    if (Nombre) {
      whereClause.Nombre = {
        [Op.like]: `%${Nombre}%`
      };
    }

    const { count, rows } = await db.Gastronomia.findAndCountAll({
      attributes: [
        "IdGastronomia",
        "Nombre",
        "Descripcion",
        "Precio",
        "FechaCreacion",
        "IdEventos",
      ],
      where: whereClause,
      order: [["Nombre", "ASC"]],
      offset: (Pagina - 1) * 10,
      limit: 10,
    });

    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    next(error);
  }
});

router.get("/api/gastronomia/:id", async function (req, res, next) {
  try {
    const gastronomia = await db.Gastronomia.findByPk(req.params.id);
    if (!gastronomia) {
      res.status(404).json({ message: "Gastronomía no encontrada" });
    } else {
      res.json(gastronomia);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/api/gastronomia", async (req, res, next) => {
  try {
    const data = await db.Gastronomia.create({
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
      Precio: req.body.Precio,
      FechaCreacion: req.body.FechaCreacion,
      IdEventos: req.body.IdEventos,
    });
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = err.errors.map((error) => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors: messages });
    } else {
      next(err);
    }
  }
});

router.put("/api/gastronomia/:id", async (req, res, next) => {
  try {
    let gastronomia = await db.Gastronomia.findByPk(req.params.id);
    if (!gastronomia) {
      res.status(404).json({ message: "Gastronomía no encontrada" });
    } else {
      gastronomia.Nombre = req.body.Nombre;
      gastronomia.Descripcion = req.body.Descripcion;
      gastronomia.Precio = req.body.Precio;
      gastronomia.FechaCreacion = req.body.FechaCreacion;
      gastronomia.IdEventos = req.body.IdEventos;
      await gastronomia.save();
      res.sendStatus(204);
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = err.errors.map((error) => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors: messages });
    } else {
      next(err);
    }
  }
});

router.delete("/api/gastronomia/:id", async (req, res, next) => {
  try {
    const gastronomia = await db.Gastronomia.findByPk(req.params.id);
    if (!gastronomia) {
      res.status(404).json({ message: "Gastronomía no encontrada" });
    } else {
      await gastronomia.destroy();
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get("/api/gastronomiaJWT", auth.authenticateJWT, async (req, res, next) => {
  try {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }
    const gastronomias = await db.Gastronomia.findAll({
      attributes: [
        "IdGastronomia",
        "Nombre",
        "Descripcion",
        "Precio",
        "FechaCreacion",
        "IdEventos",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(gastronomias);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
