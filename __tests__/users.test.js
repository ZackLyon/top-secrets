const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

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

  const createAndLogin = async () => {
    const agent = request.agent(app);

    const user = await UserService.create({ ...userSend });

    await agent.post('/api/v1/users/sessions').send({ ...userSend });

    return [agent, user];
  };

  it('should create a new user', async () => {
    const user = await request(app).post('/api/v1/users').send(userSend);

    expect(user.body).toEqual(userReceive);
  });

  it('should log in a user', async () => {
    await UserService.create({ ...userSend });

    const message = await request(app)
      .post('/api/v1/users/sessions')
      .send({ ...userSend });

    expect(message.body.message).toEqual(`Signed in as ${userSend.email}.`);
  });
});
