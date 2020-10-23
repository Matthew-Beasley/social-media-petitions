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

const sqlDeleteUser = async (email) => {
  const sql = `
  DELETE FROM users
  WHERE email = '${email}'`;
  await client.query(sql);
}

beforeEach(async () => {
  await sqlDeleteUser('sam@email.com');
  await sqlDeleteUser('jasper3467@email.com');
});

afterEach(async () => {
  await sqlDeleteUser('sam@email.com');
  await sqlDeleteUser('jasper3467@email.com');
});

afterAll(async () => {
  await client.end();
});

test('user API create user', async () => {
  const params = { email: 'jasper3467@email.com', password: 'thedog' };
  await authorizeAdmin();
  await axios.post(url + '/user', params, headers());
  const user = await getUserSql('jasper3467@email.com');
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper3467@email.com',
    })
  )
});

test('user API read all users', async () => {
  const params = { email: 'jasper3467@email.com', password: 'thedog' };
  await createUser(params);
  await authorizeAdmin();
  const users = await axios.get(url + '/user', headers());
  const user = users.data.reduce((acc, item) => {
    if (item.email === 'jasper3467@email.com') {
      acc = item;
    }
    return acc;
  }, {});
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper3467@email.com'
    })
  )
});

test('user API read users by email', async () => {
  const params = { email: 'jasper3467@email.com', password: 'thedog' };
  await createUser(params);
  await authorizeAdmin();
  const user = (await axios.get(url + '/user/email/jasper3467@email.com', headers())).data;
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper3467@email.com'
    })
  )
});

test('user API update user', async () => {
  const params = {
    email: 'jasper3467@email.com',
    password: 'thedog',
  };
  const updateParams = {
    email: 'jasper3467@email.com',
    password: 'thedog',
    firstName: 'jasper',
    lastName: 'thedog'
  };
  await createUser(params);
  await authorizeAdmin();
  const user = (await axios.post(url + '/user/update', updateParams, headers())).data;
  expect(user).toEqual(
    expect.objectContaining({
      email: 'jasper3467@email.com',
      firstName: 'jasper',
      lastName: 'thedog'
    })
  )
});

