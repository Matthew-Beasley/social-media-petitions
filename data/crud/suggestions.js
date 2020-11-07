const client = require('../client');

const createSuggestion = async (record) => {
  console.log('record in crud', record)
  const { topic, shortText, longText } = record;
  const sql = `
  INSERT INTO suggestions (topic, "shortText", "longText")
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const rows = (await client.query(sql, [topic, shortText, longText])).rows[0];
  console.log('rows in crud', rows)
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
