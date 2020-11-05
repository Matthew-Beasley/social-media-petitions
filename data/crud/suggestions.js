const client = require('../client');

const createPetition = async (record) => {
  const { topic, shortText, longText, current } = record;
  const sql = `
  INSERT INTO petitions (topic, "shortText", "longText", current)
  VALUES ($1, $2, $3, $4)
  RETURNING *`;
  return (await client.query(sql, [topic, shortText, longText, current])).rows[0];
}

const readAllPetitions = async () => {
  const sql = `
  SELECT * FROM petitions`;
  return (await client.query(sql)).rows;
}

const deletePetition = async (topic) => {
  const sql = `
  DELETE FROM petitions
  WHERE topic = $1`;
  await client.query(sql, [topic])
}

module.exports = {
  createPetition,
  readAllPetitions,
  deletePetition
};
