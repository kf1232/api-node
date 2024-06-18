const request = require('supertest');
const app = require('../src/app');
const { sequelize, initializeDatabase } = require('../src/models');
const seedDatabase = require('../src/seeders/seedItems');

let chai;

before(async () => {
  chai = await import('chai');
  const { expect } = chai;
  await sequelize.sync({ force: true });
  await initializeDatabase();
  await seedDatabase();
});

describe('GET /items', () => {
  it('should return a list of items', async () => {
    const { expect } = chai;
    const res = await request(app).get('/items');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(10); // Assuming your seed file adds 10 items
  });
});
