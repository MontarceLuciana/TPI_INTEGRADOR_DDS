const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/hotel.db");

// ######################### TO DO: Agregar HOOKS a los modelos para validar los datos
// Definimos los modelos

const Eventos = sequelize.define(
  "eventos",
  {
    IdEventos: {
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
          msg: "El nombre del evento es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La descripcion del evento es requerido",
        },
        len: {
          args: [5, 200],
          msg: "Descripcion debe ser tipo caracteres, entre 5 y 200 de longitud",
        },
      },
    },
    CantidadMaxima: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La cantidad maxima es requerida",
        },
        len: {
          args: [1, 15],
          msg: "La cantidad maxima debe tener entre 1 y 15 caracteres",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (eventos, options) {
        if (typeof eventos.Nombre === "string") {
          eventos.Nombre = eventos.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const Gastronomia = sequelize.define(
  "gastronomia",
  {
    IdGastronomia: {
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
          msg: "El nombre del menú es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe tener entre 5 y 30 caracteres de longitud",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La descripción del menú es requerida",
        },
        len: {
          args: [5, 200],
          msg: "Descripción debe tener entre 5 y 200 caracteres de longitud",
        },
      },
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
    FechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdEventos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdEventos es requerido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: function (gastronomia, options) {
        if (typeof gastronomia.Nombre === "string") {
          gastronomia.Nombre = gastronomia.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);


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

// Definimos los modelos de empleados y tareas

const Empleados = sequelize.define(
  "empleados",
  {
    IdEmpleado: {
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
          msg: "El nombre del empleado es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (empleado, options) {
        if (typeof empleado.Nombre === "string") {
          empleado.Nombre = empleado.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const Tareas = sequelize.define('tareas', {
  IdTarea: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La descripción de la tarea es requerida',
      },
      len: {
        args: [5, 100],
        msg: 'La descripción debe tener entre 5 y 100 caracteres de longitud',
      },
    },
  },
  FechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La fecha de inicio es requerida',
      },
      isDate: {
        args: true,
        msg: 'Debe ser una fecha válida',
      },
    },
  },
  FechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La fecha de fin es requerida',
      },
      isDate: {
        args: true,
        msg: 'Debe ser una fecha válida',
      },
    },
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = {
  sequelize,
  Eventos,
  Gastronomia,
  Clientes,
  Reservas,
  Empleados,  // <-- añadido
  Tareas,     // <-- añadido
};
