const {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser
} = require('../data/crud/users');
const { TestScheduler } = require('jest');

afterEach(async () => {
  await deleteUser({ email: 'someone@email.com' });
})

// TODO: Need to decrypt and compare password
test('crud User createUser', async () => {
  const user = await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  expect(user).toEqual(
    expect.objectContaining({
      email: 'someone@email.com',
      firstName: null,
      lastName: null,
      street: null,
      city: null,
      state: null,
      zipcode: null,
      isadmin: false
    })
  )
})

test('crud User getUsers', async () => {
  await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  const user = await getUsers()
  expect(user[0]).toEqual(
    expect.objectContaining({
      email: 'someone@email.com',
      firstName: null,
      lastName: null,
      street: null,
      city: null,
      state: null,
      zipcode: null,
      isadmin: false
    })
  )
})

test('crud User getUserByEmail', async () => {
  await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  
})

