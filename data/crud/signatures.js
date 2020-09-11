const client = require('../client');

const createSignature = async ({ topic, userId }) => {
  const sql = `
  INSERT INTO signatures (topic, "userId")
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [topic, userId])).rows[0];
}

const readSignatures = async () => {
  const sql = `
  SELECT * FROM signatures`;
  return (await client.query(sql)).rows;
}

const readSignaturesByPetition = async ({ topic }) => {
  const sql = `
  SELECT * FROM signatures
  WHERE topic = $1`;
  return (await client.query(sql, [topic])).rows;
}

const deleteSignature = async ({ userId, topic }) => {
  const sql = `
  DELETE FROM signatures
  WHERE "userId" = $1
  AND topic = $2`;
  await client.query(sql, [userId, topic]);
}

module.exports = {
  createSignature,
  readSignatures,
  readSignaturesByPetition,
  deleteSignature
};
