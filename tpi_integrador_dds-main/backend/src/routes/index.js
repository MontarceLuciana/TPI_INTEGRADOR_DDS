const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('La API esta corriendo...');
});

module.exports = router;
