const client = require('../client');

const createPetition = async (record) => {
  const { topic, shortText, longText, current } = record;
  const sql = `
  INSERT INTO petitions (topic, "shortText", "longText", current)
  VALUES ($1, $2, $3, $4)
  RETURNING *`;
  return (await client.query(sql, [topic, shortText, longText, current])).rows[0];
}

const readPetition = async({ topic }) => {
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

const readCurrentPetitions = async () => {
  const sql = `
  SELECT * FROM petitions
  WHERE current = true`;
  return (await client.query(sql)).rows;
}

const updatePetition = async (params) => {
  let sql = `
  UPDATE petitions
  SET `;
  let pos = 1;
  const args = [];
  for (let key in params) {
    if (key !== 'topic') {
      sql += ` "${key}" = $${pos.toString()}`;
      if (pos < (Object.keys(params).length - 1)) {
        sql += ',';
      }
      args.push(params[key]);
      pos++;
    }
  }
  sql += `
  WHERE topic = $${pos.toString()}
  RETURNING *`;
  args.push(params.topic);
  return (await client.query(sql, args)).rows[0];
}

const deletePetition = async (topic) => {
  console.log(topic)
  const sql = `
  DELETE FROM petitions
  WHERE topic = $1`;
  await client.query(sql, [topic])
}

module.exports = {
  createPetition,
  readPetition,
  readAllPetitions,
  readCurrentPetitions,
  updatePetition,
  deletePetition
};
