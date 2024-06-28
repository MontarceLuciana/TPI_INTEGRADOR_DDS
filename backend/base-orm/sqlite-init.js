const db = require("aa-sqlite"); // Accedemos a la base usando aa-sqlite

async function CrearBaseSiNoExiste() {
  await db.open("./.data/hotel.db"); // Abrimos la base de datos

  let existe = false;
  let res = null;

  // Verificar y crear tabla usuarios
  res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'usuarios'");
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run("CREATE TABLE usuarios (IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE, Clave TEXT NOT NULL, Rol TEXT NOT NULL);");
    console.log("Tabla usuarios creada!");
    await db.run("INSERT INTO usuarios (Nombre, Clave, Rol) VALUES ('admin', '123', 'admin'), ('juan', '123', 'member');");
  }

  // Verificar y crear tabla serviciosListado
  existe = false;
  res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'serviciosListado'");
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run("CREATE TABLE serviciosListado (IdServiciosListado INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL);");
    console.log("Tabla serviciosListado creada!");
    await db.run("INSERT INTO serviciosListado (Nombre) VALUES ('Servicio de limpieza'), ('Desayuno buffet'), ('Piscina climatizada'), ('Servicio de lavandería'), ('Servicio de transporte'), ('Gimnasio'), ('Spa y masajes'), ('Centro de negocios'), ('Actividades recreativas');");
  }

  // Verificar y crear tabla habitaciones
  existe = false;
  res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'habitaciones'");
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(`
      CREATE TABLE habitaciones (
        IdHabitaciones INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        FechaIngreso TEXT,
        IdServiciosListado INTEGER,
        Precio REAL,
        Disponible BOOLEAN,
        FOREIGN KEY (IdServiciosListado) REFERENCES serviciosListado(IdServiciosListado)
      );
    `);
    console.log("Tabla habitaciones creada!");
    await db.run(`
      INSERT INTO habitaciones (Nombre, FechaIngreso, IdServiciosListado, Precio, Disponible) VALUES
        ('Simple', '2022-01-01', 1, 50.00, 1),
        ('Doble', '2022-02-14', 2, 80.00, 1),
        ('Triple', '2022-03-21', 9, 120.00, 1),
        ('Cuadruple', '2022-04-17', 5, 150.00, 1),
        ('Deluxe', '2022-05-19', 7, 200.00, 1),
        ('Ejecutivo', '2022-06-24', 8, 250.00, 1),
        ('Simple', '2022-07-06', 1, 50.00, 1),
        ('Doble', '2022-08-10', 2, 80.00, 1),
        ('Triple', '2022-09-11', 6, 120.00, 1),
        ('Cuadruple', '2022-10-26', 4, 150.00, 1),
        ('Deluxe', '2022-11-22', 7, 200.00, 1),
        ('Ejecutivo', '2022-12-30', 8, 250.00, 1),
        ('Simple', '2022-11-16', 1, 50.00, 1),
        ('Doble', '2022-10-03', 2, 80.00, 1),
        ('Triple', '2022-09-15', 3, 120.00, 1),
        ('Cuadruple', '2022-08-12', 5, 150.00, 1),
        ('Deluxe', '2022-07-07', 7, 200.00, 1),
        ('Ejecutivo', '2022-06-05', 8, 250.00, 1),
        ('Simple', '2022-05-01', 1, 50.00, 1),
        ('Doble', '2022-04-04', 2, 80.00, 1);
    `);
  }

  // Verificar y crear tabla clientes
  existe = false;
  res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'clientes'");
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run("CREATE TABLE clientes (IdCliente INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL, Email TEXT NOT NULL, Telefono TEXT NOT NULL);");
    console.log("Tabla clientes creada!");
    await db.run(`
      INSERT INTO clientes (Nombre, Email, Telefono) VALUES
        ('Carlos', 'carlos@example.com', '123456789'),
        ('María', 'maria@example.com', '987654321'),
        ('José', 'jose@example.com', '456123789'),
        ('Ana', 'ana@example.com', '321456987'),
        ('Luis', 'luis@example.com', '654789123');
    `);
  }

  // Verificar y crear tabla reservas
  existe = false;
  res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'reservas'");
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(`
      CREATE TABLE reservas (
        IdReserva INTEGER PRIMARY KEY AUTOINCREMENT,
        Cliente TEXT NOT NULL,
        Fecha DATE NOT NULL,
        Habitacion TEXT NOT NULL
      );
    `);
    console.log("Tabla reservas creada!");
    await db.run(`
      INSERT INTO reservas (Cliente, Fecha, Habitacion) VALUES
        ('Carlos', '2022-01-01', 'Simple'),
        ('María', '2022-02-14', 'Doble'),
        ('José', '2022-03-21', 'Triple'),
        ('Ana', '2022-04-17', 'Cuadruple'),
        ('Luis', '2022-05-19', 'Deluxe');
    `);
  }

  db.close(); // Cerramos la base de datos
}

CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste
