const db = require("aa-sqlite"); // Accedemos a la base usando aa-sqlite

async function CrearBaseSiNoExiste() {
  await db.open("./.data/hotel.db"); // Abrimos la base de datos
  // await db.open(process.env.base);
  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      `INSERT INTO usuarios values
              (1,'admin','123','admin'),
              (2,'juan','123','member');`
    );
  }
  //
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'servicioslistado'", // Consultamos si la tabla servicios listado
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla servicios listado existe, seteamos existe en true
  if (!existe) {
    // Si la tabla servicios listado no existe, la creamos
    await db.run(
      "CREATE TABLE serviciosListado (IdServiciosListado INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE);"
    );
    //console.log('Tabla servicios listado creada');
    await db.run(
      `INSERT INTO serviciosListado (IdServicioslistado, Nombre) VALUES
            (1, 'Servicio de limpieza'),
            (2, 'Desayuno buffet'),
            (3, 'Piscina climatizada'),
            (4, 'Servicio de lavandería'),
            (5, 'Servicio de transporte'),
            (6, 'Gimnasio'),
            (7, 'Spa y masajes'),
            (8, 'Centro de negocios'),
            (9, 'Actividades recreativas');`
    );
  }

  existe = false;
  (sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'habitaciones'"), // Consultamos si la tabla habitaciones existe
    (res = await db.get(sql, []));
  if (res.contar > 0) existe = true; // Si la tabla habitaciones existe, seteamos existe en true
  if (!existe) {
    // Si la tabla habitaciones no existe, la creamos
    await db.run(
      `CREATE TABLE habitaciones (IdHabitaciones INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    Nombre TEXT NOT NULL,
                                    FechaIngreso TEXT,
                                    IdServiciosListado INTEGER,
                                    Precio real,
                                    Disponible boolean,
                                    FOREIGN KEY (IdServiciosListado) REFERENCES serviciosListado(IdServiciosListado));`
    );
    //console.log('Tabla habitaciones creada');
    await db.run(
      // Insertamos habitaciones en la tabla habitaciones
        `INSERT INTO habitaciones (IdHabitaciones, Nombre, FechaIngreso, IdServiciosListado, Precio, Disponible) VALUES
            (1, 'Simple', '01/01/2022', 1, 50.00, 1),      
            (2, 'Doble', '14/02/2022', 2, 80.00, 1),      
            (3, 'Triple', '21/03/2022', 9, 120.00, 1),     
            (4, 'Cuadruple', '17/04/2022', 5, 150.00, 1),   
            (5, 'Deluxe', '19/05/2022', 7, 200.00, 1),      
            (6, 'Ejecutivo', '24/06/2022', 8, 250.00, 1),   
            (7, 'Simple', '06/07/2022', 1, 50.00, 1),       
            (8, 'Doble', '10/08/2022', 2, 80.00, 1),      
            (9, 'Triple', '11/09/2022', 6, 120.00, 1),     
            (10, 'Cuadruple', '26/10/2022', 4, 150.00, 1),  
            (11, 'Deluxe', '22/11/2022', 7, 200.00, 1),     
            (12, 'Ejecutivo', '30/12/2022', 8, 250.00, 1),  
            (13, 'Simple', '16/11/2022', 1, 50.00, 1),      
            (14, 'Doble', '03/10/2022', 2, 80.00, 1),       
            (15, 'Triple', '15/09/2022', 3, 120.00, 1),     
            (16, 'Cuadruple', '12/08/2022', 5, 150.00, 1), 
            (17, 'Deluxe', '07/07/2022', 7, 200.00, 1),   
            (18, 'Ejecutivo', '05/06/2022', 8, 250.00, 1), 
            (19, 'Simple', '01/05/2022', 1, 50.00, 1),
            (20, 'Doble', '04/04/2022', 2, 80.00, 1);`
    );
  }

// CAMBIAR ACA PARA LOS MODELOS DE CLIENTES Y RESERVAS

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'clientes'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE clientes (IdCliente INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL, Email TEXT NOT NULL, Telefono TEXT NOT NULL);"
    );
    console.log("Tabla clientes creada");
    await db.run(
      `INSERT INTO clientes (IdCliente, Nombre, Email, Telefono) VALUES
          (1, 'Carlos', 'carlos@example.com', '123456789'),
          (2, 'María', 'maria@example.com', '987654321'),
          (3, 'José', 'jose@example.com', '456123789'),
          (4, 'Ana', 'ana@example.com', '321456987'),
          (5, 'Luis', 'luis@example.com', '654789123');`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'reservas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE reservas (IdReserva INTEGER PRIMARY KEY AUTOINCREMENT, 
                              Cliente TEXT NOT NULL,
                              Fecha DATE NOT NULL,
                              Habitacion TEXT NOT NULL);`
    );
    console.log("Tabla reservas creada");
    await db.run(
      `INSERT INTO reservas (IdReserva, Cliente, Fecha, Habitacion) VALUES
          (1, 'Carlos', '2022-01-01', 'Simple'),
          (2, 'María', '2022-02-14', 'Doble'),
          (3, 'José', '2022-03-21', 'Triple'),
          (4, 'Ana', '2022-04-17', 'Cuadruple'),
          (5, 'Luis', '2022-05-19', 'Deluxe');`
    );
  }

  // ...

  // Agregar los demás modelos existentes

  // ...

  db.close(); // Cerramos la base de datos
}
CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste
