const client = require('../client');

const createUser = async (record) => {
  const { firstName, lastName, street, city, state } = record;
  const sql = `
  INSERT INTO users ("firstName", "lastName", street, city, state)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`;
  return (await client.query(sql, [firstName, lastName, street, city, state])).row[0];
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
