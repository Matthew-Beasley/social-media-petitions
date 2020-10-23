const { deleteUser } = require('../data/crud/users');
const {
  client
} = require('./testUtils');
const {
  readSignaturesByPetition,
  deleteSignature
} = require('../data/crud/signatures');
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const {
  authorizeUser,
  headers
} = require('./testAuthorization');

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
  await deleteSignature({
    email: 'jasper5678@email.com',
    topic: 'Dogs should rule the world'
  });
});

beforeAll(() => {
  client.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('pg connected')
    }
  });
});

afterAll(() => {
  client.end(err => {
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
});

test('signature api createSignature', async () => {
  await authorizeUser();
  await axios.post(url + '/signature', {
    topic: 'Dogs should rule the world',
    email: 'jasper5678@email.com'
  }, headers());
  const signatures = await readSignaturesByPetition({ topic: 'Dogs should rule the world' });
  const signature = signatures.reduce((acc, item) => {
    if (item.email === 'jasper5678@email.com') {
      acc = item;
    }
    return acc;
  }, {})
  expect(signature).toEqual(
    expect.objectContaining({
      email: 'jasper5678@email.com',
      topic: 'Dogs should rule the world'
    })
  )
});

test('signature api get signatures (all)', async () => {
  await authorizeUser();
  const sql = `
  INSERT INTO signatures (email, topic)
  VALUES ('jasper5678@email.com', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  const signatures = await axios.get(url + '/signature', headers());
  let isThere = false;
  signatures.data.forEach(signature => {
    if (signature.email === 'jasper5678@email.com' && signature.topic === 'Dogs should rule the world') {
      isThere = true;
    }
  })
  expect(isThere).toEqual(true)
});

test('api signatures get by topic', async () => {
  await authorizeUser();
  const sql = `
  INSERT INTO signatures (email, topic)
  VALUES ('jasper5678@email.com', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  const signature = await axios.get(url + '/signature/Dogs should rule the world', headers());
  expect(signature.data[0]).toEqual(
    expect.objectContaining({
      email: 'jasper5678@email.com',
      topic: 'Dogs should rule the world'
    })
  )
});

test('api signatures delete', async () => {
  const sql = `
  INSERT INTO signatures (email, topic)
  VALUES ('jasper5678@email.com', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  await authorizeUser();
  const query = url + '/signature?topic=Dogs%20should%20rule%20the%20world&email=jasper5678@email.com'
  await axios.delete(query, headers());
  const testSql = `
  SELECT * FROM signatures
  WHERE email = 'jasper5678@email.com'
  AND topic = 'Dogs should rule the world'`;
  const signatures = (await client.query(testSql)).rows;
  const signature = signatures.reduce((acc, item) => {
    if (item.topic === 'Dogs should rule the world' &&
      item.email === 'jasper5678@email.com') {
      acc = item;
    }
    return acc;
  }, {})
  expect(signature).toEqual({});
});

