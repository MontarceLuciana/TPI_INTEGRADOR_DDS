const Post = require('../models/Post');

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un post existente
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post no enconteado' });
    await post.destroy();
    res.json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
