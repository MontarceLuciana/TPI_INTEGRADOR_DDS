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

//
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
//

// CAMBIAR ACA
const Peliculas = sequelize.define(
  "peliculas",
  {
    IdPelicula: {
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
          msg: "El nombre de la pelicula es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaPublicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdDirector: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Recaudacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//
const Directores = sequelize.define(
  "directores",
  {
    IdDirector: {
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
          msg: "El nombre del director es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PaisOrigen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NumPeliculasDirigidas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (director, options) {
        if (typeof director.Nombre === "string") {
          director.Nombre = director.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const Canciones = sequelize.define(
  "canciones",
  {
    IdCancion: {
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
          msg: "El nombre de la cancion es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdArtista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//
const Artistas = sequelize.define(
  "artistas",
  {
    IdArtista: {
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
          msg: "El nombre del artista es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    PaisOrigen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NumDeAlbums: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (director, options) {
        if (typeof director.Nombre === "string") {
          director.Nombre = director.Nombre.toUpperCase().trim();
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
  
  Directores,
  Peliculas,
  Artistas,
  Canciones,
};
