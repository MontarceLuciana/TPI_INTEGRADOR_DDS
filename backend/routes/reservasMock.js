const express = require('express');
const router = express.Router();

let arr_ReservasMock = [
  { IdReserva: 1, Cliente: "John Doe", Fecha: "2024-06-27", Habitacion: "101" },
  { IdReserva: 2, Cliente: "Jane Doe", Fecha: "2024-06-28", Habitacion: "102" },
  // más datos mock
];

router.get('/api/reservasmock', async function (req, res) {
  res.json(arr_ReservasMock);
});

router.get('/api/reservasmock/:id', async function (req, res) {
  let reserva = arr_ReservasMock.find(
    (x) => x.IdReserva == req.params.id
  );
  if (reserva) res.json(reserva);
  else res.status(404).json({ message: 'reserva no encontrada' });
});

router.post('/api/reservasmock/', (req, res) => {
  const { Cliente, Fecha, Habitacion } = req.body;
  let reserva = {
    Cliente, Fecha, Habitacion,
    IdReserva: Math.floor(Math.random() * 100000),
  };

  arr_ReservasMock.push(reserva);
  res.status(201).json(reserva);
});

router.put('/api/reservasmock/:id', (req, res) => {
  let reserva = arr_ReservasMock.find(
    (x) => x.IdReserva == req.params.id
  );

  if (reserva) {
    const { Cliente, Fecha, Habitacion } = req.body;
    reserva.Cliente = Cliente;
    reserva.Fecha = Fecha;
    reserva.Habitacion = Habitacion;
    res.json({ message: 'reserva actualizada' });
  } else {
    res.status(404).json({ message: 'reserva no encontrada' })
  }
});

router.delete('/api/reservasmock/:id', (req, res) => {
  let reserva = arr_ReservasMock.find(
    (x) => x.IdReserva == req.params.id
  );

  if (reserva) {
    arr_ReservasMock = arr_ReservasMock.filter(
      (x) => x.IdReserva != req.params.id
    );
    res.json({ message: 'reserva eliminada' });
  } else {
    res.status(404).json({ message: 'reserva no encontrada' })
  }
});

module.exports = router;
