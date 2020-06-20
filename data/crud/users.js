const client = require('../client');
const {
  findUserFromToken,
  authenticate,
  compare,
  hash
} = require('../auth')

const createUser = async (user) => {
  //console.log('user in crud', user)
  const { email, password } = user;
  const pwd = await hash(password);
  console.log('pwd in crud', pwd)
  const sql = `
  INSERT INTO users (email, password)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [email, pwd])).rows[0];
}

const getUsers = async () => {
  const sql = `
  SELECT * FROM users`;
  return (await client.query(sql)).rows;
}

const getUserByEmail = async ({ email }) => {
  const sql = `
  SELECT * FROM users
  WHERE email = $1`;
  return (await client.query(sql, [email])).rows[0];
}

const updateUser = async (record) => {
  let position = 1;
  const params = [];
  let sql = `
  UPDATE users
  SET `
  for (let key in record) {
    if (key !== 'email') {
      sql += `${key} = $${position.toString()} `;
      params.push(record[key]);
      position++;
    }
  }
  position++;
  params.push(record.email)
  sql += `
  WHERE email = $${position.toString()}
  RETURNING *`;
  return (await client.query(sql, [...params])).rows[0];
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser
}

