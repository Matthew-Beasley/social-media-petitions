const {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser
} = require('../data/crud/users');

afterEach(async () => {
  await deleteUser({ email: 'someone@email.com' });
})

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
      isAdmin: false
    })
  )
})

test('crud User getUsers', async () => {
  await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  const users = await getUsers();
  expect(users.length).toBeGreaterThan(0)
})

test('crud User getUserByEmail', async () => {
  await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  const user = await getUserByEmail({ email: 'someone@email.com' });
  expect(user).toEqual(
    expect.objectContaining({
      email: 'someone@email.com',
      firstName: null,
      lastName: null,
      street: null,
      city: null,
      state: null,
      zipcode: null,
      isAdmin: false
    })
  )
})

test('crud User updateUser', async () => {
  await createUser({
    email: 'someone@email.com',
    password: '12345'
  })
  const user = await updateUser({
    email: 'someone@email.com',
    firstName: 'chief',
    lastName: 'dog',
    street: '9401 52nd st se',
    city: 'snohomish',
    state: 'wa',
    zipcode: '99290',
    isAdmin: true
  })
  expect(user).toEqual(
    expect.objectContaining({
      email: 'someone@email.com',
      firstName: 'chief',
      lastName: 'dog',
      street: '9401 52nd st se',
      city: 'snohomish',
      state: 'wa',
      zipcode: '99290',
      isAdmin: true
    })
  )
})

