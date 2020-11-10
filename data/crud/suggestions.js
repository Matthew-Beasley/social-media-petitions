const client = require('../client');

const createSuggestion = async (record) => {
  const { topic, shortText, longText, email } = record;
  const sql = `
  INSERT INTO suggestions (topic, "shortText", "longText", email)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  const rows = (await client.query(sql, [topic, shortText, longText, email])).rows[0];
  return rows;
}

const readAllSuggestions = async () => {
  const sql = `
  SELECT * FROM suggestions`;
  return (await client.query(sql)).rows;
}

const deleteSuggestion = async (topic) => {
  const sql = `
  DELETE FROM suggestions
  WHERE topic = $1`;
  await client.query(sql, [topic])
}

module.exports = {
  createSuggestion,
  readAllSuggestions,
  deleteSuggestion
};
