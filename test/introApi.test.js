const {
  createUser,
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

let user = null;
let token = null;

const authNewUser = async () => {
  user = await createUser({ email: 'sam@email.com', password: 'jasper' });
  token = await authenticate({ email: 'sam@email.com', password: 'jasper' });
  authedUser = await
}

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
})

test('intros api createIntro', async () => {
  const title = 'Trump is a dictator';
  const text = 'Trump is subverting everything sacred in the US';
  const intro = await axios.post('/intro', { text, title }, headers());
  expect(intro).toEqual(
    expect.objectContaining({
      title
    })
  )
});
