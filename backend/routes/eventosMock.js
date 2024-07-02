const express = require('express');
const router = express.Router();

// Simulación de datos de eventos (mock)
let arr_EventosMock = [
  { "IdEventos": 1, "Nombre": "Conferencia", "Descripcion": "Eventos de negocios en salas de conferencia del hotel.", "CapacidadMaxima": 100},
  { "IdEventos": 2, "Nombre": "Boda", "Descripcion": "Celebraciones matrimoniales en salones de eventos del hotel.", "CapacidadMaxima": 150 },
  { "IdEventos": 3, "Nombre": "Seminario", "Descripcion": "Capacitaciones educativas en salas de reuniones del hotel.", "CapacidadMaxima": 80 },
  { "IdEventos": 4, "Nombre": "Fiesta de Cumpleaños", "Descripcion": "Celebración de cumpleaños en áreas designadas para eventos sociales.", "CapacidadMaxima": 50 },
  { "IdEventos": 5, "Nombre": "Cena de Gala", "Descripcion": "Evento formal con cena en salones de banquetes del hotel.", "CapacidadMaxima": 80 },
  { "IdEventos": 6, "Nombre": "Taller", "Descripcion": "Actividad formativa o educativa en salas de talleres del hotel.", "CapacidadMaxima": 40  },
  { "IdEventos": 7, "Nombre": "Reunión Corporativa", "Descripcion": "Encuentro empresarial en salas de reuniones corporativas del hotel.", "CapacidadMaxima": 120 },
  { "IdEventos": 8, "Nombre": "Coctel", "Descripcion": "Evento social informal en áreas de cocteles y recepciones del hotel.", "CapacidadMaxima": 70 },
  { "IdEventos": 9, "Nombre": "Reunión Privada", "Descripcion": "Evento privado o exclusivo en áreas reservadas para reuniones privadas.", "CapacidadMaxima": 60  },
  { "IdEventos": 10, "Nombre": "Presentación de Producto", "Descripcion": "Lanzamiento de productos en áreas adecuadas para presentaciones del hotel.", "CapacidadMaxima": 90  }
];

// Obtener todos los eventos
router.get('/api/eventos', async function (req, res) {
  res.json(arr_EventosMock);
});

// Obtener un evento por ID
router.get('/api/eventos/:id', async function (req, res) {
  let evento = arr_EventosMock.find(
    (x) => x.IdEventos == req.params.id
  );
  if (evento) res.json(evento);
  else res.status(404).json({ message: 'Evento no encontrado' });
});

// Agregar un nuevo evento
router.post('/api/eventos/', (req, res) => {
  const { Nombre } = req.body;
  let evento = {
    Nombre,
    IdEventos: Math.floor(Math.random() * 100000),
  };

  // Agregar a la colección de eventos
  arr_EventosMock.push(evento);

  res.status(201).json(evento);
});

// Actualizar un evento por ID
router.put('/api/eventos/:id', (req, res) => {
  let evento = arr_EventosMock.find(
    (x) => x.IdEventos == req.params.id
  );

  if (evento) {
    const { Nombre } = req.body;
    evento.Nombre = Nombre;
    res.json({ message: 'Evento actualizado' });
  } else {
    res.status(404).json({ message: 'Evento no encontrado' });
  }
});

// Eliminar un evento por ID
router.delete('/api/eventos/:id', (req, res) => {
  let evento = arr_EventosMock.find(
    (x) => x.IdEventos == req.params.id
  );

  if (evento) {
    arr_EventosMock = arr_EventosMock.filter(
      (x) => x.IdEventos != req.params.id
    );
    res.json({ message: 'Evento eliminado' });
  } else {
    res.status(404).json({ message: 'Evento no encontrado' });
  }
});

module.exports = router;
