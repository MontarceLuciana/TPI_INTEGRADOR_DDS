const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");


router.get("/api/habitaciones", async function (req, res, next) {
  // #swagger.tags = ['Habitaciones']
  // #swagger.summary = 'obtiene todos las Habitaciones'
  // consulta de habitaciones con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Habitaciones.findAndCountAll({
    attributes: [
      "IdHabitaciones",
      "Nombre",
      "FechaIngreso",
      "IdServiciosListado",
      "Precio",
      "Disponible",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/habitaciones/:id", async function (req, res, next) {
  // #swagger.tags = ['Habitaciones']
  // #swagger.summary = 'obtiene una habitacion'
  // #swagger.parameters['id'] = { description: 'identificador de habitación...' }
  let items = await db.Habitaciones.findOne({
    attributes: [
      "IdHabitaciones",
      "Nombre",
      "FechaIngreso",
      "IdServiciosListado",
      "Precio",
      "Disponible",
    ],
    where: { IdHabitaciones: req.params.id },
  });
  res.json(items);
});

router.post("/api/habitaciones/", async (req, res) => {
  // #swagger.tags = ['Habitaciones']
  // #swagger.summary = 'agrega una habitación'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva habitación',
                schema: { $ref: '#/definitions/Habitaciones' }
    } */
  try {
    let data = await db.Libros.create({
      Nombre: req.body.Nombre,
      FechaIngreso: req.body.FechaIngreso,
      IdServiciosListado: req.body.IdServiciosListado,
      Precio: req.body.Precio,
      Disponible: req.body.Disponible
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/habitaciones/:id", async (req, res) => {
  // #swagger.tags = ['Habitaciones']
  // #swagger.summary = 'actualiza una habitación'
  // #swagger.parameters['id'] = { description: 'identificador de Habitación...' }
  /*    #swagger.parameters['Habitación'] = {
                in: 'body',
                description: 'Habitación a actualizar',
                schema: { $ref: '#/definitions/Habitaciones' }
    } */

  try {
    let item = await db.Habitaciones.findOne({
      attributes: [
      "IdHabitaciones",
      "Nombre",
      "FechaIngreso",
      "IdServiciosListado",
      "Precio",
      "Disponible",
      ],
      where: { IdHabitaciones: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Habitacion no encontrada" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaIngreso = req.body.FechaIngreso;
    item.IdServiciosListado = req.body.IdServiciosListado;
    item.Precio = req.body.Precio,
    item.Disponible = req.body.Disponible;
    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/habitaciones/:id", async (req, res) => {
  // #swagger.tags = ['Habitaciones']
  // #swagger.summary = 'elimina una habitación'
  // #swagger.parameters['id'] = { description: 'identificador de habiatcion..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Habitaciones.destroy({
      where: { IdHabitaciones: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE habitaciones SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdHabitaciones = :IdHabitaciones",
        {
          replacements: { IdHabitaciones: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
    "/api/habitacionesJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['Habitaciones']
      // #swagger.summary = 'obtiene todos las habitaciones, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.Libros.findAll({
        attributes: [
          "IdHabitaciones",
          "Nombre",
          "FechaIngreso",
          "IdServiciosListado",
          "Precio",
          "Disponible",
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );
  
module.exports = router;
