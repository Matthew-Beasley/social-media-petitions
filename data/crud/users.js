const client = require('../client');
const {
  findUserFromToken,
  authenticate,
  compare,
  hash
} = require('../auth')

const createUser = async (user) => {
  const { email, password } = user;
  const pwd = await hash(password);
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
      sql += `"${key}" = $${position.toString()}, `;
      params.push(record[key]);
      position++;
    }
  }
  sql = sql.substring(0, sql.length - 2);
  params.push(record.email)
  sql += `
  WHERE email = $${position.toString()}
  RETURNING *`;
  console.log(sql)
  console.log(params)
  return (await client.query(sql, params)).rows[0];
}

const deleteUser = ({ email }) => {
  const sql = `
  DELETE FROM users
  WHERE email = $1`;
  return client.query(sql, [email])
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser
}

