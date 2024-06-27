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
                                    Nombre TEXT NOT NULL UNIQUE,
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

  //tabla directores//

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'directores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE directores (IdDirector INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE, FechaNacimiento DATE, PaisOrigen TEXT NOT NULL, NumPeliculasDirigidas INTEGER);"
    );
    console.log("Tabla directores creada");
    await db.run(
      `INSERT INTO directores (IdDirector, Nombre, FechaNacimiento, PaisOrigen, NumPeliculasDirigidas) VALUES
                              (1, 'Christopher Nolan', '07/30/1970', 'Reino Unido', 10), -- Ejemplo de número de películas dirigidas
                              (2, 'Francis Ford Coppola', '04/07/1939', 'Estados Unidos', 24),
                              (3, 'Quentin Tarantino', '03/27/1963', 'Estados Unidos', 9),
                              (4, 'Steven Spielberg', '12/18/1946', 'Estados Unidos', 33),
                              (5, 'David Fincher', '08/28/1962', 'Estados Unidos', 11),
                              (6, 'Robert Zemeckis', '05/14/1952', 'Estados Unidos', 20),
                              (7, 'Lana Wachowski', '06/21/1965', 'Estados Unidos', 10),
                              (8, 'Lilly Wachowski', '12/29/1967', 'Estados Unidos', 8),
                              (9, 'Martin Scorsese', '11/17/1942', 'Estados Unidos', 25),
                              (10, 'Frank Darabont', '01/28/1959', 'Hungría', 5),
                              (11, 'Peter Jackson', '10/31/1961', 'Nueva Zelanda', 12),
                              (12, 'George Lucas', '05/14/1944', 'Estados Unidos', 7),
                              (13, 'Ridley Scott', '11/30/1937', 'Reino Unido', 24),
                              (14, 'James Cameron', '08/16/1954', 'Canadá', 9),
                              (15, 'Jonathan Demme', '02/22/1944', 'Estados Unidos', 18),
                              (16, 'Roger Allers', '06/29/1949', 'Estados Unidos', 4),
                              (17, 'Rob Minkoff', '08/11/1962', 'Estados Unidos', 8),
                              (18, 'Michael Curtiz', '12/24/1886', 'Hungría', 62),
                              (19, 'Damien Chazelle', '01/19/1985', 'Estados Unidos', 8);`
    );
  }

  //

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'peliculas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE peliculas (IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, 
                                Nombre TEXT NOT NULL UNIQUE, 
                                FechaPublicacion DATE,
                                IdDirector INTEGER, 
                                Duracion INTEGER, 
                                Recaudacion INTEGER,
                                FOREIGN KEY (IdDirector) REFERENCES directores(IdDirector));`
    );
    console.log("Tabla peliculas creada");
    await db.run(
      `INSERT INTO peliculas (IdPelicula, Nombre, FechaPublicacion, IdDirector, Duracion, Recaudacion) VALUES
                            (1, 'Inception', '07/16/2010', 1, 148, 829895144),
                            (2, 'The Godfather', '03/24/1972', 2, 175, 246120986),
                            (3, 'Pulp Fiction', '10/14/1994', 3, 154, 213928762),
                            (4, 'Schindlers List', '12/15/1993', 4, 195, 322161245),
                            (5, 'The Dark Knight', '07/18/2008', 1, 152, 1004558444),
                            (6, 'Fight Club', '10/15/1999', 5, 139, 101209702),
                            (7, 'Forrest Gump', '07/06/1994', 6, 142, 678226465),
                            (8, 'The Matrix', '03/31/1999', 7, 136, 466364845),
                            (9, 'Goodfellas', '09/19/1990', 9, 146, 46836394),
                            (10, 'The Shawshank Redemption', '09/23/1994', 10, 142, 28815245),
                            (11, 'The Lord of the Rings: The Fellowship of the Ring', '12/19/2001', 11, 178, 897690072),
                            (12, 'Star Wars: Episode IV - A New Hope', '05/25/1977', 12, 121, 775398007),
                            (13, 'Gladiator', '05/05/2000', 13, 155, 460583960),
                            (14, 'Titanic', '12/19/1997', 14, 195, 2201647264),
                            (15, 'The Silence of the Lambs', '02/14/1991', 15, 118, 272742922),
                            (16, 'Jurassic Park', '06/11/1993', 4, 127, 1032926565),
                            (17, 'The Lion King', '06/24/1994', 16, 88, 968511805),
                            (18, 'The Terminator', '10/26/1984', 14, 107, 78371200),
                            (19, 'Casablanca', '11/26/1942', 18, 102, 10300000),
                            (20, 'La La Land', '12/09/2016', 19, 128, 448906484);`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'artistas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE artistas (IdArtista INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE, PaisOrigen TEXT NOT NULL, NumDeAlbums INTEGER);"
    );
    console.log("Tabla artistas creada");
    await db.run(
      `INSERT INTO artistas (IdArtista, Nombre, PaisOrigen, NumDeAlbums) VALUES
                              (1, 'Queen', 'Reino Unido', 15),
                              (2, 'Eagles', 'Estados Unidos', 7),
                              (3, 'Michael Jackson', 'Estados Unidos', 10),
                              (4, 'AC/DC', 'Australia', 17),
                              (5, 'Adele', 'Reino Unido', 4),
                              (6, 'Ed Sheeran', 'Reino Unido', 6),
                              (7, 'The Weeknd', 'Canadá', 5),
                              (8, 'Mark Ronson', 'Reino Unido', 5),
                              (9, 'Nirvana', 'Estados Unidos', 3),
                              (10, 'Oasis', 'Reino Unido', 7),
                              (11, 'The Beatles', 'Reino Unido', 13),
                              (12, 'Eminem', 'Estados Unidos', 11)`
    );
  }

  //

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'canciones'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE canciones (IdCancion INTEGER PRIMARY KEY AUTOINCREMENT, 
                                Nombre TEXT NOT NULL UNIQUE, 
                                FechaLanzamiento DATE,
                                IdArtista INTEGER, 
                                Duracion INTEGER, 
                                Genero TEXT NOT NULL,
                                FOREIGN KEY (IdArtista) REFERENCES artistas(IdArtista));`
    );
    console.log("Tabla canciones creada");
    await db.run(
      `INSERT INTO canciones (IdCancion, Nombre, FechaLanzamiento, IdArtista, Duracion, Genero) VALUES
                              (1, 'Bohemian Rhapsody', '10/31/1975', 1, 5.54, 'Rock'),
                              (2, 'Hotel California', '02/22/1977', 2, 6.31, 'Rock'),
                              (3, 'Thriller', '11/30/1982', 3, 5.57, 'Pop'),
                              (4, 'Back in Black', '07/25/1980', 4, 4.15, 'Rock'),
                              (5, 'Rolling in the Deep', '11/29/2010', 5, 3.48, 'Soul'),
                              (6, 'Shape of You', '01/06/2017', 6, 3.53, 'Pop'),
                              (7, 'Blinding Lights', '11/29/2019', 7, 3.20, 'Synthwave'),
                              (8, 'Someone Like You', '01/24/2011', 5, 4.45, 'Soul'),
                              (9, 'Uptown Funk', '11/10/2014', 8, 4.29, 'Funk'),
                              (10, 'Thinking Out Loud', '09/24/2014', 6, 4.41, 'Pop'),
                              (11, 'Smells Like Teen Spirit', '09/10/1991', 9, 5.01, 'Grunge'),
                              (12, 'Wonderwall', '10/30/1995', 10, 4.18, 'Britpop'),
                              (13, 'Hey Jude', '08/26/1968', 11, 7.05, 'Rock'),
                              (14, 'Billie Jean', '01/02/1983', 3, 4.53, 'Pop'),
                              (15, 'Lose Yourself', '10/28/2002', 12, 5.20, 'Hip-Hop')`
    );
  }
  ////

  //console.log('Base de datos creada');
  db.close(); // Cerramos la base de datos
}
CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste

