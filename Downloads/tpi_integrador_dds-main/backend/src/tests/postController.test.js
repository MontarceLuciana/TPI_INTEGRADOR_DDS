const request = require('supertest');
const app = require('../index');
const sequelize = require('../config/database');
const Post = require('../models/Post');
const User = require('../models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ id: 1, name: 'Test User', email: 'test@example.com' });
});

describe('Post API', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1 // Asegúrate de que haya un usuario con ID 1
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch a post by ID', async () => {
    const posts = await Post.findAll();
    const postId = posts[0].id;
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', postId);
  });

  it('should update a post', async () => {
    const posts = await Post.findAll();
    const postId = posts[0].id;
    const res = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: 'Updated Test Post',
        content: 'This is an updated test post',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', postId);
  });

  it('should delete a post', async () => {
    const posts = await Post.findAll();
    const postId = posts[0].id;
    const res = await request(app).delete(`/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Post deleted');
  });
});

afterAll(async () => {
  await sequelize.close();
});
