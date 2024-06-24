// src/seed.js

const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Esto recrea la base de datos

  // Crear usuarios de ejemplo
  const users = await User.bulkCreate([
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'Dave', email: 'dave@example.com' },
    { name: 'Eve', email: 'eve@example.com' },
    { name: 'Frank', email: 'frank@example.com' },
    { name: 'Grace', email: 'grace@example.com' },
    { name: 'Heidi', email: 'heidi@example.com' },
  ]);

  // Crear posts de ejemplo
  const posts = await Post.bulkCreate([
    { title: 'Post 1', content: 'Contenido Post 1', userId: users[0].id },
    { title: 'Post 2', content: 'Contenido Post 2', userId: users[1].id },
    { title: 'Post 3', content: 'Contenido Post 3', userId: users[2].id },
    { title: 'Post 4', content: 'Contenido Post 4', userId: users[3].id },
    { title: 'Post 5', content: 'Contenido Post 5', userId: users[4].id },
    { title: 'Post 6', content: 'Contenido Post 6', userId: users[5].id },
    { title: 'Post 7', content: 'Contenido Post 7', userId: users[6].id },
    { title: 'Post 8', content: 'Contenido Post 8', userId: users[7].id },
    { title: 'Post 9', content: 'Contenido Post 9', userId: users[8].id },
    { title: 'Post 10', content: 'Contenido Post 10', userId: users[9].id },
  ]);

  console.log('Base de datos generada');
  process.exit();
};

seedDatabase();
