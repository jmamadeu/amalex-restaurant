const request = require('supertest');
const app = require('../../src/app');

describe('Session', () => {
  it('Should be to able of returns the token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'mateus@gmail.com', password: 'localhost' });

    expect(response.body.success).toBe(true);
  });

  it('Should be to able of not returns the token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'mas@gml.com', password: 'localhost' });

    expect(response.body.success).toBe(false);

    const response_pass = await request(app)
      .post('/sessions')
      .send({ email: 'mateus@gmail.com', password: 'alsals' });

    expect(response.body.success).toBe(false);
    expect(response_pass.body.success).toBe(false);
  });
});
