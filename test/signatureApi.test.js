const { deleteUser } = require('../data/crud/users');
const client = require('../data/client');
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
    userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
    topic: 'Dogs should rule the world'
  });
});

test('signature api createSignature', async () => {
  await authorizeUser();
  await axios.post(url + '/signature', {
    topic: 'Dogs should rule the world',
    userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
  }, headers());
  const signatures = await readSignaturesByPetition({ topic: 'Dogs should rule the world' });
  const signature = signatures.reduce((acc, item) => {
    if (item.userId === '4f6b5196-5543-4ef4-b6b9-33414853d2b6') {
      acc = item;
    }
    return acc;
  }, {})
  expect(signature).toEqual(
    expect.objectContaining({
      userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
      topic: 'Dogs should rule the world'
    })
  )
});

test('signature api get signatures (all)', async () => {
  await authorizeUser();
  const sql = `
  INSERT INTO signatures ("userId", topic)
  VALUES ('4f6b5196-5543-4ef4-b6b9-33414853d2b6', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  const signatures = await axios.get(url + '/signature', headers());
  expect(signatures.data[0]).toEqual(
    expect.objectContaining({
        userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
        topic: 'Dogs should rule the world'
      } )
  )
});

test('api signatures get by topic', async () => {
  await authorizeUser();
  const sql = `
  INSERT INTO signatures ("userId", topic)
  VALUES ('4f6b5196-5543-4ef4-b6b9-33414853d2b6', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  const signature = await axios.get(url + '/signature/Dogs should rule the world', headers());
  expect(signature.data[0]).toEqual(
    expect.objectContaining({
      userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
      topic: 'Dogs should rule the world'
    })
  )
});

test('api signatures delete', async () => {
  const sql = `
  INSERT INTO signatures ("userId", topic)
  VALUES ('4f6b5196-5543-4ef4-b6b9-33414853d2b6', 'Dogs should rule the world')
  RETURNING *`;
  await client.query(sql);
  await authorizeUser();
  const query = url + '/signature?topic=Dogs%20should%20rule%20the%20world&userId=4f6b5196-5543-4ef4-b6b9-33414853d2b6'
  await axios.delete(query, headers());
  const testSql = `
  SELECT * FROM signatures
  WHERE "userId" = '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
  AND topic = 'Dogs should rule the world'`;
  const signatures = (await client.query(testSql)).rows;
  const signature = signatures.reduce((acc, item) => {
    if (item.topic === 'Dogs should rule the world' &&
    item.userId === '4f6b5196-5543-4ef4-b6b9-33414853d2b6') {
      acc = item;
    }
    return acc;
  }, {})
  expect(signature).toEqual({});
});

