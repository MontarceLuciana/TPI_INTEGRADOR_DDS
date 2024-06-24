const request = require('supertest');
const app = require('../index');
const sequelize = require('../config/database');
const User = require('../models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('User Controller', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new user', async () => {
    const newUser = { name: 'Test User', email: 'testuser@example.com' };
    const response = await request(app).post('/users').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  // More tests for other endpoints...
});
