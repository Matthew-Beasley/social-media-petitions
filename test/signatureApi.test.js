const { deleteUser } = require('../data/crud/users');
const client = require('../data/client');
const {
  createSignature,
  readSignatures,
  readSignaturesByPetition,
  deleteSignature
} = require('../data/crud/signatures');
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const {
  authorizeAdmin,
  authorizeUser,
  headers
} = require('./testAuthorization');

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
  await deleteSignature({
    userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
    topic: 'Trump is an authoritarion despot'
  });
});

test('signature api createSignature', async () => {
  await authorizeUser();
  await axios.post(url + '/signature', {
    topic: 'Trump is an authoritarion despot',
    userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
  }, headers());
  const signatures = await readSignaturesByPetition({ topic: 'Trump is an authoritarion despot' });
  const signature = signatures.reduce((acc, item) => {
    if (item.userId === '4f6b5196-5543-4ef4-b6b9-33414853d2b6') {
      acc = item;
    }
    return acc;
  }, {})
  expect(signature).toEqual(
    expect.objectContaining({
      userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
      topic: 'Trump is an authoritarion despot'
    })
  )
});

test('signature api get signatures (all)', async () => {
  await authorizeUser();
  const sql = `
  INSERT INTO signatures ("userId", topic)
  VALUES ('4f6b5196-5543-4ef4-b6b9-33414853d2b6', 'Trump is an authoritarion despot')
  RETURNING *`;
  await client.query(sql);
  const signatures = await axios.get(url + '/signature', headers());
  console.log(signatures.data[0]);
  expect(signatures.data[0]).toEqual(
    expect.objectContaining(
      {
        userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6',
        topic: 'Trump is an authoritarion despot'
      }
    )
  )
});

