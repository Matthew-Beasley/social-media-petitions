const client = require('../client');

const createPetitions = async (record) => {
  const { topic, text } = record;
  const sql = `
  INSERT INTO petitions (topic, text)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [topic, text])).rows[0];
}

const readPetition = async ({ topic }) => {
  const sql = `
  SELECT * FROM petitions
  WHERE topic = $1`;
  return (await client.query(sql, [topic])).rows[0];
}

const readAllPetitions = async () => {
  const sql = `
  SELECT * FROM petitions`;
  return (await client.query(sql)).rows;
}

const deletePetition = async ({ topic }) => {
  const sql = `
  DELETE FROM petitions
  WHERE topic = $1
  RETURNING *`;
  return (await client.query(sql, [topic])).rows[0]
}

module.exports = {
  createPetitions,
  readPetition,
  readAllPetitions,
  deletePetition
};
