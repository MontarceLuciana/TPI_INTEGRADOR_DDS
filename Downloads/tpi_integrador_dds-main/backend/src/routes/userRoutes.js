const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const userController = require('../controllers/userController');

// Definir las rutas para usuarios
router.get('/', userController.getUsers); // Aquí se cambió a getUsers
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
