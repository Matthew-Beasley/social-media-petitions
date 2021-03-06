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
  authorizeAdmin,
  headers
} = require('./testAuthorization');

const sqlDeleteAllForEmail = async (email) => {
  const sql = `
  DELETE FROM signatures
  WHERE email = '${email}'`;
  await client.query(sql);
}

const sqlDeleteUser = async (email) => {
  const sql = `
  DELETE FROM users
  WHERE email = '${email}'`;
  await client.query(sql);
}

const sqlCreateSignature = async (topic, email) => {
  const sql = `
  INSERT INTO signatures (topic, email)
  VALUES ('${topic}', '${email}')`;
  await client.query(sql);
}

afterEach(async () => {
  await sqlDeleteUser('sam@email.com' );
  await sqlDeleteAllForEmail('jasper5678@email.com');
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
      email: 'jasper5678@email.com', //fix this?
      topic: 'Dogs should rule the world'
    })
  )
});
/*
test('api signatures get by email', async () => {
  await sqlCreateSignature('A problem', 'jasper5678@email.com');
  await sqlCreateSignature('another problem', 'jasper5678@email.com');
  const rows = (await client.query('select * from signatures')).rows
  console.log(rows)
  await authorizeUser();
  const signatures = await axios.get(url + '/signature/byemail?email=jasper5678@email.com', headers());
  expect(signatures.data.length).toEqual(2);
});
*/
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

