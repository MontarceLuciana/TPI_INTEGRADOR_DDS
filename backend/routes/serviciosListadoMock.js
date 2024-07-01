const express = require('express');
const router = express.Router();

let arr_ServiciosListadoMock = [
  { "IdServiciosListado": 1, "Nombre": "Servicio de limpieza" },
  { "IdServiciosListado": 2, "Nombre": "Desayuno buffet" },
  { "IdServiciosListado": 3, "Nombre": "Piscina climatizada" },
  { "IdServiciosListado": 4, "Nombre": "Servicio de lavandería" },
  { "IdServiciosListado": 5, "Nombre": "Servicio de transporte" },
  { "IdServiciosListado": 6, "Nombre": "Gimnasio" },
  { "IdServiciosListado": 7, "Nombre": "Spa y masajes" },
  { "IdServiciosListado": 8, "Nombre": "Centro de negocios" },
  { "IdServiciosListado": 9, "Nombre": "Actividades recreativas" }
];

router.get('/api/serviciosListado', async function (req, res) {
  res.json(arr_ServiciosListadoMock);
});

router.get('/api/serviciosListado/:id', async function (req, res) {
  let serviciosListado = arr_ServiciosListadoMock.find(
    (x) => x.IdServiciosListado == req.params.id
  );
  if (serviciosListado) res.json(serviciosListado);
  else res.status(404).json({ message: 'servicio no encontrado' });
});

router.post('/api/serviciosListado/', (req, res) => {
  const { Nombre } = req.body;
  let serviciosListado = {
    Nombre,
    IdServiciosListado: Math.floor(Math.random() * 100000),
  };

  // aquí agregar a la colección
  arr_ServiciosListadoMock.push(serviciosListado);

  res.status(201).json(serviciosListado);
});

router.put('/api/serviciosListado/:id', (req, res) => {
  let serviciosListado = arr_ServiciosListadoMock.find(
    (x) => x.IdServiciosListado == req.params.id
  );

  if (serviciosListado) {
    const { Nombre } = req.body;
    serviciosListado.Nombre = Nombre;
    res.json({ message: 'servicio actualizado' });
  } else {
    res.status(404).json({ message: 'servicio no encontrado' });
  }
});

router.delete('/api/serviciosListado/:id', (req, res) => {
  let serviciosListado = arr_ServiciosListadoMock.find(
    (x) => x.IdServiciosListado == req.params.id
  );

  if (serviciosListado) {
    arr_ServiciosListadoMock = arr_ServiciosListadoMock.filter(
      (x) => x.IdServiciosListado != req.params.id
    );
    res.json({ message: 'servicio eliminado' });
  } else {
    res.status(404).json({ message: 'servicio no encontrado' });
  }
});

module.exports = router;
