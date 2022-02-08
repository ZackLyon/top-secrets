const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const userSend = {
    email: 'giJoe@defense.gov',
    password: 'Go Joe!',
  };

  const userReceive = {
    id: expect.any(String),
    email: 'giJoe@defense.gov',
  };

  it('should create a new user', async () => {
    const user = await request(app).post('/api/v1/users').send(userSend);

    expect(user.body).toEqual(userReceive);
  });
});
