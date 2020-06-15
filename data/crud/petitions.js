const client = require('../client');

//topic VARCHAR(256) UNIQUE,
 // text TEXT

const createPetitions = async (record) => {
  const { topic, text } = record;
  const sql = `
  INSERT INTO petitions (topic, text),
  VALUES ($1, $2)
  RETU&RNING *`;
  return (await client.query(sql, [topic, record])).rows[0];
}

const readPetitions = async (name) => {

}

const readAllPetitions = async () => {

}

module.exports = {
  createPetitions,
  readPetitions,
  readAllPetitions
};
