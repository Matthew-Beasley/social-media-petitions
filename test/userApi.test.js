const {
  deleteUser,
  createUser
} = require('../data/crud/users');
const client = require('../data/client');
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const {
  authorizeAdmin,
  authorizeUser,
  headers
} = require('./testAuthorization');
const testAuthorization = require('./testAuthorization');

const getUserSql = async (email) => {
  const sql = `
  SELECT * FROM users
  WHERE email = $1`;
  return (await client.query(sql, [email])).rows[0];
}

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
  await deleteUser({ email: 'jasper@email.com' })
});

test('user API create user', async () => {
  const params = { email: 'jasper@email.com', password: 'thedog' };
  await authorizeAdmin();
  await axios.post(url + '/user', params, headers());
  const user = await getUserSql('jasper@email.com');
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper@email.com',
    })
  )
});

test('user API read all users', async () => {
  const params = { email: 'jasper@email.com', password: 'thedog' };
  await createUser(params);
  await authorizeAdmin();
  const users = await axios.get(url + '/user', headers());
  const user = users.data.reduce((acc, item) => {
    if (item.email === 'jasper@email.com') {
      acc = item;
    }
    return acc;
  }, {});
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper@email.com'
    })
  )
});

test('user API read users by email', async () => {
  const params = { email: 'jasper@email.com', password: 'thedog' };
  await createUser(params);
  await authorizeAdmin();
  const user = (await axios.get(url + '/user/email/jasper@email.com', headers())).data;
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper@email.com'
    })
  )
});

test('user API rupdate user', async () => {
  const params = {
    email: 'jasper@email.com',
    password: 'thedog',
  };
  const updateParams = {
    email: 'jasper@email.com',
    password: 'thedog',
    firstName: 'jasper',
    lastName: 'thedog'
  };
  await createUser(params);
  await authorizeAdmin();
  const user = (await axios.post(url + '/user/update', updateParams, headers())).data;
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper@email.com',
      firstName: 'jasper',
      lastName: 'thedog'
    })
  )
});

