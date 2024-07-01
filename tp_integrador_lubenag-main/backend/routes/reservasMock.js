const express = require('express');
const router = express.Router();

let arr_ReservasMock = [
  { IdReserva: 1, Cliente: "John Doe", Fecha: "2024-06-27", Habitacion: "101" },
  { IdReserva: 2, Cliente: "Jane Doe", Fecha: "2024-06-28", Habitacion: "102" },
  { IdReserva: 3, Cliente: "María González", Fecha: "2024-06-29", Habitacion: "103" },
  { IdReserva: 4, Cliente: "Carlos Pérez", Fecha: "2024-06-30", Habitacion: "104" },
  { IdReserva: 5, Cliente: "Sofía López", Fecha: "2024-07-01", Habitacion: "105" },
  { IdReserva: 6, Cliente: "Javier Gómez", Fecha: "2024-07-02", Habitacion: "106" },
  { IdReserva: 7, Cliente: "Valentina Fernández", Fecha: "2024-07-03", Habitacion: "107" },
  { IdReserva: 8, Cliente: "Martín Ramírez", Fecha: "2024-07-04", Habitacion: "108" },
  { IdReserva: 9, Cliente: "Lucía Martínez", Fecha: "2024-07-05", Habitacion: "109" },
  { IdReserva: 10, Cliente: "Mateo Sánchez", Fecha: "2024-07-06", Habitacion: "110" },
  { IdReserva: 11, Cliente: "Julieta Torres", Fecha: "2024-07-07", Habitacion: "111" },
  { IdReserva: 12, Cliente: "Federico Ruiz", Fecha: "2024-07-08", Habitacion: "112" },
  { IdReserva: 13, Cliente: "Camila Giménez", Fecha: "2024-07-09", Habitacion: "113" },
  { IdReserva: 14, Cliente: "Diego Rojas", Fecha: "2024-07-10", Habitacion: "114" },
  { IdReserva: 15, Cliente: "Micaela Castro", Fecha: "2024-07-11", Habitacion: "115" },
  { IdReserva: 16, Cliente: "Nicolás Morales", Fecha: "2024-07-12", Habitacion: "116" },
  { IdReserva: 17, Cliente: "Paula Herrera", Fecha: "2024-07-13", Habitacion: "117" },
  { IdReserva: 18, Cliente: "Agustín Ortiz", Fecha: "2024-07-14", Habitacion: "118" },
  { IdReserva: 19, Cliente: "Florencia Silva", Fecha: "2024-07-15", Habitacion: "119" },
  { IdReserva: 20, Cliente: "Francisco Romero", Fecha: "2024-07-16", Habitacion: "120" },
  { IdReserva: 21, Cliente: "Martina Mendoza", Fecha: "2024-07-17", Habitacion: "121" },
  { IdReserva: 22, Cliente: "Juan Cruz Navarro", Fecha: "2024-07-18", Habitacion: "122" },
  { IdReserva: 23, Cliente: "Santiago Álvarez", Fecha: "2024-07-19", Habitacion: "123" },
  { IdReserva: 24, Cliente: "Josefina Ruiz Díaz", Fecha: "2024-07-20", Habitacion: "124" },
  { IdReserva: 25, Cliente: "Tomás Ibáñez", Fecha: "2024-07-21", Habitacion: "125" },
  { IdReserva: 26, Cliente: "Emilia Peralta", Fecha: "2024-07-22", Habitacion: "126" },
  { IdReserva: 27, Cliente: "Renato Molina", Fecha: "2024-07-23", Habitacion: "127" },
  { IdReserva: 28, Cliente: "Lola Vázquez", Fecha: "2024-07-24", Habitacion: "128" },
  { IdReserva: 29, Cliente: "Ignacio Suárez", Fecha: "2024-07-25", Habitacion: "129" },
  { IdReserva: 30, Cliente: "Pilar Domínguez", Fecha: "2024-07-26", Habitacion: "130" }
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
