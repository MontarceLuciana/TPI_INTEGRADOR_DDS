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
        ('John Doe', '2024-06-27', '101'),
    ('Jane Doe', '2024-06-28', '102'),
    ('María González', '2024-06-29', '103'),
    ('Carlos Pérez', '2024-06-30', '104'),
    ('Sofía López', '2024-07-01', '105'),
    ('Javier Gómez', '2024-07-02', '106'),
    ('Valentina Fernández', '2024-07-03', '107'),
    ('Martín Ramírez', '2024-07-04', '108'),
    ('Lucía Martínez', '2024-07-05', '109'),
    ('Mateo Sánchez', '2024-07-06', '110'),
    ('Julieta Torres', '2024-07-07', '111'),
    ('Federico Ruiz', '2024-07-08', '112'),
    ('Camila Giménez', '2024-07-09', '113'),
    ('Diego Rojas', '2024-07-10', '114'),
    ('Micaela Castro', '2024-07-11', '115'),
    ('Nicolás Morales', '2024-07-12', '116'),
    ('Paula Herrera', '2024-07-13', '117'),
    ('Agustín Ortiz', '2024-07-14', '118'),
    ('Florencia Silva', '2024-07-15', '119'),
    ('Francisco Romero', '2024-07-16', '120'),
    ('Martina Mendoza', '2024-07-17', '121'),
    ('Juan Cruz Navarro', '2024-07-18', '122'),
    ('Santiago Álvarez', '2024-07-19', '123'),
    ('Josefina Ruiz Díaz', '2024-07-20', '124'),
    ('Tomás Ibáñez', '2024-07-21', '125'),
    ('Emilia Peralta', '2024-07-22', '126'),
    ('Renato Molina', '2024-07-23', '127'),
    ('Lola Vázquez', '2024-07-24', '128'),
    ('Ignacio Suárez', '2024-07-25', '129'),
    ('Pilar Domínguez', '2024-07-26', '130');
    `);
  }

// Verificar y crear tabla empleados (estática)
existe = false;
res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'empleados'");
if (res.contar > 0) existe = true;
if (!existe) {
  await db.run(`
    CREATE TABLE empleados (
      IdEmpleado INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      Apellido TEXT NOT NULL,
      Puesto TEXT NOT NULL,
      FechaContratacion DATE NOT NULL
    );
  `);
  console.log("Tabla empleados creada!");
  await db.run(`
    INSERT INTO empleados (Nombre, Apellido, Puesto, FechaContratacion) VALUES
      ('Juan', 'Pérez', 'Recepcionista', '2022-01-01'),
      ('María', 'González', 'Gerente', '2021-06-15'),
      ('Carlos', 'Ramírez', 'Conserje', '2022-03-10'),
      ('Ana', 'López', 'Cocinera', '2021-11-30'),
      ('Luis', 'Martínez', 'Botones', '2022-04-25'),
      ('Pedro', 'Sánchez', 'Mantenimiento', '2022-05-20'),
      ('Lucía', 'Fernández', 'Limpieza', '2022-06-01'),
      ('Miguel', 'Torres', 'Camarero', '2022-07-15'),
      ('Sofía', 'Navarro', 'Recepcionista', '2022-08-10'),
      ('Andrés', 'Mendoza', 'Seguridad', '2022-09-05');
  `);
}

// Verificar y crear tabla tareas (dinámica)
existe = false;
res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' AND name = 'tareas'");
if (res.contar > 0) existe = true;
if (!existe) {
  await db.run(`
    CREATE TABLE tareas (
      IdTarea INTEGER PRIMARY KEY AUTOINCREMENT,
      Descripcion TEXT NOT NULL,
      FechaInicio DATE NOT NULL,
      FechaFin DATE,
      IdEmpleado INTEGER,
      FOREIGN KEY(IdEmpleado) REFERENCES empleados(IdEmpleado)
    );
  `);
  console.log("Tabla tareas creada!");
  await db.run(`
    INSERT INTO tareas (Descripcion, FechaInicio, FechaFin, IdEmpleado) VALUES
      ('Recepción de huéspedes', '2024-01-01', '2024-01-10', 1),
      ('Gestión de reservas', '2024-01-02', '2024-01-11', 2),
      ('Ayuda con el equipaje', '2024-01-03', '2024-01-12', 5),
      ('Limpieza de habitaciones', '2024-01-04', '2024-01-13', 7),
      ('Preparación de desayunos', '2024-01-05', '2024-01-14', 4),
      ('Mantenimiento de piscina', '2024-01-06', '2024-01-15', 6),
      ('Servicio en el restaurante', '2024-01-07', '2024-01-16', 8),
      ('Control de seguridad', '2024-01-08', '2024-01-17', 10),
      ('Atención en la recepción', '2024-01-09', '2024-01-18', 9),
      ('Supervisión del personal', '2024-01-10', '2024-01-19', 2);
  `);
  }

  db.close(); // Cerramos la base de datos
}

CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste
