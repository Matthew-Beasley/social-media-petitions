const {
  createUser,
  updateUser,
} = require('../data/crud/users');
const { authenticate } = require('../data/auth');
process.env.JWT = 'foobar';

let token = null;

const headers = () => {
  return {
    headers: {
      authorization: token
    }
  };
};

const authorizeUser = async () => {
  await createUser({ email: 'sam@email.com', password: 'jasper' });
  token = await authenticate({ email: 'sam@email.com', password: 'jasper' });
}

const authorizeAdmin = async () => {
  await createUser({ email: 'sam@email.com', password: 'jasper' });
  await updateUser({ email: 'sam@email.com', isAdmin: true })
  token = await authenticate({ email: 'sam@email.com', password: 'jasper' });
}

module.exports = {
  authorizeAdmin,
  authorizeUser,
  headers
};
