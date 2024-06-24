const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes); // Ruta principal
app.use('/api/users', userRoutes); // Ruta para usuarios
app.use('/api/posts', postRoutes); // Ruta para posts

// Sync database
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`El servidor esta corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Problemas al conectar con la base de datos', err);
  });

module.exports = app;
