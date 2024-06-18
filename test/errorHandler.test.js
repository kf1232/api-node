const request = require('supertest');
const app = require('../src/app');

let expect;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

describe('Error Handling Middleware', () => {
  it('should handle 404 errors', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('message').that.includes('Not Found');
  });
});
