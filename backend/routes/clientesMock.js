const express = require('express');
const router = express.Router();

let arr_ClientesMock = [
  { IdCliente: 1, Nombre: "John Doe", Email: "john.doe@gmail.com", Telefono: "123456789" },
  { IdCliente: 2, Nombre: "Jane Doe", Email: "jane.doe@hotmail.com", Telefono: "987654321" },
  { IdCliente: 3, Nombre: "María González", Email: "maria.gonzalez@gmail.com", Telefono: "1122334455" },
  { IdCliente: 4, Nombre: "Carlos Pérez", Email: "carlos.perez@outlook.com", Telefono: "2233445566" },
  { IdCliente: 5, Nombre: "Sofía López", Email: "sofia.lopez@yahoo.com", Telefono: "3344556677" },
  { IdCliente: 6, Nombre: "Javier Gómez", Email: "javier.gomez@live.com", Telefono: "4455667788" },
  { IdCliente: 7, Nombre: "Valentina Fernández", Email: "valentina.fernandez@gmail.com", Telefono: "5566778899" },
  { IdCliente: 8, Nombre: "Martín Ramírez", Email: "martin.ramirez@hotmail.com", Telefono: "6677889900" },
  { IdCliente: 9, Nombre: "Lucía Martínez", Email: "lucia.martinez@outlook.com", Telefono: "7788990011" },
  { IdCliente: 10, Nombre: "Mateo Sánchez", Email: "mateo.sanchez@yahoo.com", Telefono: "8899001122" },
  { IdCliente: 11, Nombre: "Julieta Torres", Email: "julieta.torres@live.com", Telefono: "9900112233" },
  { IdCliente: 12, Nombre: "Federico Ruiz", Email: "federico.ruiz@gmail.com", Telefono: "0011223344" },
  { IdCliente: 13, Nombre: "Camila Giménez", Email: "camila.gimenez@hotmail.com", Telefono: "1122334466" },
  { IdCliente: 14, Nombre: "Diego Rojas", Email: "diego.rojas@outlook.com", Telefono: "2233445577" },
  { IdCliente: 15, Nombre: "Micaela Castro", Email: "micaela.castro@yahoo.com", Telefono: "3344556688" },
  { IdCliente: 16, Nombre: "Nicolás Morales", Email: "nicolas.morales@live.com", Telefono: "4455667799" },
  { IdCliente: 17, Nombre: "Paula Herrera", Email: "paula.herrera@gmail.com", Telefono: "5566778800" },
  { IdCliente: 18, Nombre: "Agustín Ortiz", Email: "agustin.ortiz@hotmail.com", Telefono: "6677889911" },
  { IdCliente: 19, Nombre: "Florencia Silva", Email: "florencia.silva@outlook.com", Telefono: "7788990022" },
  { IdCliente: 20, Nombre: "Francisco Romero", Email: "francisco.romero@yahoo.com", Telefono: "8899001133" },
  { IdCliente: 21, Nombre: "Martina Mendoza", Email: "martina.mendoza@live.com", Telefono: "9900112244" },
  { IdCliente: 22, Nombre: "Juan Cruz Navarro", Email: "juan.cruz.navarro@gmail.com", Telefono: "0011223355" },
  { IdCliente: 23, Nombre: "Santiago Álvarez", Email: "santiago.alvarez@hotmail.com", Telefono: "1122334467" },
  { IdCliente: 24, Nombre: "Josefina Ruiz Díaz", Email: "josefina.ruiz.diaz@outlook.com", Telefono: "2233445588" },
  { IdCliente: 25, Nombre: "Tomás Ibáñez", Email: "tomas.ibanez@yahoo.com", Telefono: "3344556699" },
  { IdCliente: 26, Nombre: "Emilia Peralta", Email: "emilia.peralta@live.com", Telefono: "4455667700" },
  { IdCliente: 27, Nombre: "Renato Molina", Email: "renato.molina@gmail.com", Telefono: "5566778811" },
  { IdCliente: 28, Nombre: "Lola Vázquez", Email: "lola.vazquez@hotmail.com", Telefono: "6677889922" },
  { IdCliente: 29, Nombre: "Ignacio Suárez", Email: "ignacio.suarez@outlook.com", Telefono: "7788990033" },
  { IdCliente: 30, Nombre: "Pilar Domínguez", Email: "pilar.dominguez@yahoo.com", Telefono: "8899001144" }
];


router.get('/api/clientesmock', async function (req, res) {
  res.json(arr_ClientesMock);
});

router.get('/api/clientesmock/:id', async function (req, res) {
  let cliente = arr_ClientesMock.find(
    (x) => x.IdCliente == req.params.id
  );
  if (cliente) res.json(cliente);
  else res.status(404).json({ message: 'cliente no encontrado' });
});

router.post('/api/clientesmock/', (req, res) => {
  const { Nombre, Email, Telefono } = req.body;
  let cliente = {
    Nombre, Email, Telefono,
    IdCliente: Math.floor(Math.random() * 100000),
  };

  arr_ClientesMock.push(cliente);
  res.status(201).json(cliente);
});

router.put('/api/clientesmock/:id', (req, res) => {
  let cliente = arr_ClientesMock.find(
    (x) => x.IdCliente == req.params.id
  );

  if (cliente) {
    const { Nombre, Email, Telefono } = req.body;
    cliente.Nombre = Nombre;
    cliente.Email = Email;
    cliente.Telefono = Telefono;
    res.json({ message: 'cliente actualizado' });
  } else {
    res.status(404).json({ message: 'cliente no encontrado' })
  }
});

router.delete('/api/clientesmock/:id', (req, res) => {
  let cliente = arr_ClientesMock.find(
    (x) => x.IdCliente == req.params.id
  );

  if (cliente) {
    arr_ClientesMock = arr_ClientesMock.filter(
      (x) => x.IdCliente != req.params.id
    );
    res.json({ message: 'cliente eliminado' });
  } else {
    res.status(404).json({ message: 'cliente no encontrado' })
  }
});

module.exports = router;
