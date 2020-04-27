const request = require('supertest');

const app = require('../../src/app');

const dbConnection = require('../../src/database');

describe('Employee', () => {
  beforeAll(async () => {
    await dbConnection('employees')
      .whereNot('em_email', 'mateus@gmail.com')
      .del();
  });

  it('Should be to able created new register on table', async () => {
    const response_auth = await request(app).post('/sessions').send({
      email: 'mateus@gmail.com',
      password: 'localhost',
    });

    expect(response_auth.body.success).toBe(true);

    await request(app)
      .post('/employees')
      .set('Authorization', `Bearer ${response_auth.body.token}`)
      .send({
        name: 'Fábio Akita',
        email: 'fabioakita@gmail.com',
        password: 'fabio123',
        phone: '+244911234532',
        address: 'Cazenga',
        category: 'salesman',
      });

    const response = await request(app)
      .get('/employees')
      .set('Authorization', `Bearer ${response_auth.body.token}`);

    expect(response.body.data).toHaveLength(2);
  });
});
