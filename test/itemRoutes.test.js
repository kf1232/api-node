const request = require('supertest');
const app = require('../src/app');
const { sequelize, initializeDatabase } = require('../src/models');
const seedDatabase = require('../src/seeders/seedItems');

let expect;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
  await sequelize.sync({ force: true });
  await initializeDatabase();
  await seedDatabase();
});

describe('GET /items', () => {
  it('should return a list of items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(10); // Assuming your seed file adds 10 items
  });
});

describe('POST /items', () => {
  it('should create a new item', async () => {
    const newItem = {
      name: 'New Item',
      description: 'Description for New Item',
      price: 123.45,
    };

    const res = await request(app).post('/items').send(newItem);
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.include(newItem);

    const getRes = await request(app).get('/items');
    expect(getRes.body.length).to.equal(11); // 10 seeded items + 1 new item
  });
});
