const client = require('../client');

const createSignature = async ({ topic, email }) => {
  const sql = `
  INSERT INTO signatures (topic, email)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [topic, email])).rows[0];
}

const readSignatures = async () => {
  const sql = `
  SELECT * FROM signatures`;
  return (await client.query(sql)).rows;
}

const readMySignatures = async (email) => {
  const sql = `
    SELECT DISTINCT petitions.id, petitions.topic, petitions."shortText" , petitions."longText" , petitions.current, signatures.email
    FROM signatures
    JOIN petitions
    ON signatures.topic = petitions.topic`;
  const resp = await client.query(sql)
  const rowsByEmail = [];
  for (let i = 0; i < resp.rows.length; i++) {
    if (resp.rows[i].email === email) {
      rowsByEmail.push(resp.rows[i]);
    }
  }
  return rowsByEmail;
}

const readSignaturesByPetition = async ({ topic }) => {
  const sql = `
  SELECT * FROM signatures
  WHERE topic = $1`;
  return (await client.query(sql, [topic])).rows;
}

const deleteSignature = async ({ email, topic }) => {
  const sql = `
  DELETE FROM signatures
  WHERE email = $1
  AND topic = $2`;
  await client.query(sql, [email, topic]);
}

module.exports = {
  createSignature,
  readSignatures,
  readMySignatures,
  readSignaturesByPetition,
  deleteSignature
};
