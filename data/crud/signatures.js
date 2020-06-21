const client = require('../client');

const createSignature = async ({ topic, userId }) => {
  const sql = `
  INSERT INTO signatures (topic, "userId")
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [topic, userId])).rows[0];
}

const getSignatures = async () => {
  const sql = `
  SELECT * FROM signatures`;
  return (await client.query(sql)).rows;
}

const getSignaturesByPetition = async ({ topic }) => {
  const sql = `
  SELECT * FROM signatures
  WHERE topic = $1`;
  return (await client.query(sql, [topic])).rows;
}

module.exports = {
  createSignature,
  getSignatures,
  getSignaturesByPetition
};
