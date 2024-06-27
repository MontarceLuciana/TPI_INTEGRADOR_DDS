const express = require('express');
const router = express.Router();

let arr_ClientesMock = [
  { IdCliente: 1, Nombre: "John Doe", Email: "john.doe@example.com", Telefono: "123456789" },
  { IdCliente: 2, Nombre: "Jane Doe", Email: "jane.doe@example.com", Telefono: "987654321" },
  // más datos mock
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
