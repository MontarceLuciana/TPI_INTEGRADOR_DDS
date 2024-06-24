const express = require('express');
const router = express.Router();

// Importar el controlador de posts
const postController = require('../controllers/postController');

// Definir las rutas para posts
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
