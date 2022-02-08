const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Secret = require('../lib/models/Secret.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const secretSend = {
    title: 'Nick Rivers',
    description:
      'Listen to me, Hillary. I`m not the first guy who fell in love with a woman that he met at a restaurant who turned out to be the daughter of a kidnapped scientist, only to lose her to her childhood lover who she last saw on a deserted island, who then turned out fifteen years later to be the leader of the French underground.',
  };

  const secretReceive = {
    id: expect.any(String),
    ...secretSend,
    createdAt: expect.any(String),
  };

  it('should create a secret', async () => {
    const secret = await request(app).post('/api/v1/secrets').send(secretSend);

    expect(secret.body).toEqual(secretReceive);
  });

  it('should get all secrets', async () => {
    await Secret.insert(secretSend);
    await Secret.insert(secretSend);

    const twoSecrets = [{ ...secretReceive }, { ...secretReceive }];

    const secrets = await request(app).get('/api/v1/secrets');

    expect(secrets.body).toEqual(twoSecrets);
  });
});
