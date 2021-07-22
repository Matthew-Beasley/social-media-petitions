const client = require('./client');
const {
  createUser,
  updateUser,
} = require('./crud/users');

const setConbecToAdmin = async () => {
  const sql = `
  SELECT * FROM users
  WHERE email = 'conbec@outlook.com'`;
  const conbec = (await client.query(sql)).rows[0];
  if (conbec) {
    await updateUser({ email: 'conbec@outlook.com', isAdmin: true })
  } else {
    await createUser({ email: 'conbec@outlook.com', password: 'jasper' });
    await updateUser({ email: 'conbec@outlook.com', isAdmin: true })
  }
};

module.exports = { setConbecToAdmin };
