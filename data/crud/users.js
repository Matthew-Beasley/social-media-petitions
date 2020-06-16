const client = require('../client');

const createUser = async (record) => {
  const {
    email,
    password,
    firstName,
    lastName,
    street,
    city,
    state } = record;
  const sql = `
  INSERT INTO users (email, password, "firstName", "lastName", street, city, state)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`;
  return (await client.query(sql, [email, password, firstName, lastName, street, city, state])).rows[0];
}

const getUsers = async () => {
  const sql = `
  SELECT * FROM users`;
  return (await client.query(sql)).rows;
}

module.exports = {
  createUser,
  getUsers
}

