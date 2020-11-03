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

const readUnsignedPetitions = async (email) => {
  const unsignedsql = `
  SELECT DISTINCT petitions.id, petitions.topic, petitions."shortText" , petitions."longText" , petitions.current, signatures.email
  FROM petitions
  JOIN signatures
  ON signatures.topic = petitions.topic`;
  const signedPetitions = (await client.query(unsignedsql)).rows;
  const allPetitions = (await client.query('SELECT * FROM petitions')).rows;
  //console.log(allPetitions)
  const unsignedPetitions = [];
  for (let i = 0; i < allPetitions.length; i++) {
    let pushit = true;
    console.log(allPetitions[i])
    for (let k = 0; k < signedPetitions.length; k++) {
      //console.log(signedPetitions[k])
      if (allPetitions[i].topic === signedPetitions[k].topic && signedPetitions[k].email ===  email) {
        pushit = false;
      }
    }
    if (pushit === true) {
      unsignedPetitions.push(allPetitions[i]);
    }
    pushit = true;
  }
  //console.log(unsignedPetitions)
  return unsignedPetitions;
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
  readUnsignedPetitions,
  updatePetition,
  deletePetition
};
