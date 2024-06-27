// Configuramos ORM Sequelize
const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite:" + process.env.base);
const sequelize = new Sequelize("sqlite:" + "./.data/hotel.db");

// ######################### TO DO: Agregar HOOKS a los modelos para validar los datos
// Definimos los modelos
const ServiciosListado = sequelize.define(
  "serviciosListado",
  {
    IdServiciosListado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del servicio es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
  },

  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (autor, options) {
        if (typeof autor.Nombre === "string") {
          autor.Nombre = autor.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const Habitaciones = sequelize.define(
  "habitaciones",
  {
    IdHabitaciones: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la habitación es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaIngreso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdServiciosListado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        },
      },
    },
    Disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Disponible es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

// CAMBIAR ACA PARA LOS MODELOS DE CLIENTES Y RESERVAS
const Clientes = sequelize.define(
  "clientes",
  {
    IdCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del cliente es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Email debe ser una dirección de correo electrónico válida",
        },
      },
    },
    Telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El teléfono del cliente es requerido",
        },
        len: {
          args: [7, 15],
          msg: "El teléfono debe tener entre 7 y 15 caracteres",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (cliente, options) {
        if (typeof cliente.Nombre === "string") {
          cliente.Nombre = cliente.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const Reservas = sequelize.define(
  "reservas",
  {
    IdReserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Cliente: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del cliente es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de la reserva es requerida",
        },
      },
    },
    Habitacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la habitación es requerido",
        },
        len: {
          args: [1, 10],
          msg: "Nombre de la habitación debe ser tipo caracteres, entre 1 y 10 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (reserva, options) {
        if (typeof reserva.Cliente === "string") {
          reserva.Cliente = reserva.Cliente.toUpperCase().trim();
        }
        if (typeof reserva.Habitacion === "string") {
          reserva.Habitacion = reserva.Habitacion.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  ServiciosListado,
  Habitaciones,
  Clientes,  // <-- añadido
  Reservas,  // <-- añadido
  Directores,
  Peliculas,
  Artistas,
  Canciones,
};
