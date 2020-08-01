const {
  createUser,
  updateUser,
  deleteUser
} = require('../data/crud/users');
const { authenticate } = require('../data/auth');
const { TestScheduler } = require('jest');
const axios = require('axios');
process.env.JWT = 'foobar';


const headers = () => {
  return {
    headers: {
      authorization: token
    }
  };
};

const url = 'http://localhost:3000';
let user = null;
let token = null;

const authorizeUser = async () => {
  user = await createUser({ email: 'sam@email.com', password: 'jasper' });
  token = await authenticate({ email: 'sam@email.com', password: 'jasper' });
}

const authorizeAdmin = async () => {
  await createUser({ email: 'sam@email.com', password: 'jasper' });
  user = await updateUser({ email: 'sam@email.com', isAdmin: true })
  token = await authenticate({ email: 'sam@email.com', password: 'jasper' });
}

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
})

test('intros api createIntro', async () => {
  const title = 'Trump is a dictator';
  const text = 'Trump is subverting everything sacred in the US';
  await authorizeAdmin();
  const intro = await axios.post(url + '/intro', { text, title }, headers());
  expect(intro.data).toEqual(
    expect.objectContaining({
      title: 'Trump is a dictator',
      text: 'Trump is subverting everything sacred in the US'
    })
  )
});
