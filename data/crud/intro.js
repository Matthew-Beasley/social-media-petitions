const client = require('../client');

const createIntro = async ({ title, text }) => {
  const sql = `
  INSERT INTO intro (title, text)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [title, text])).rows[0];
}

const readAllIntros = async () => {
  const sql = `
  SELECT * FROM intro`;
  return (await client.query(sql)).rows;
}

const readIntroByTitle = async ({ title }) => {
  const sql = `
  SELECT * FROM intro
  WHERE title = $1`;
  return (await client.query(sql, [title])).rows[0];
}

const readCurrentIntro = async () => {
  const sql = `
  SELECT * FROM intro
  WHERE current = TRUE`;
  return (await client.query(sql)).rows[0];
}

const setCurrentIntro = async ({ title }) => {
  const sqlSetFalse = `
  UPDATE intro
  SET current = FALSE`;
  const sqlSetTrue = `
  UPDATE intro
  SET current = TRUE
  WHERE title = $1`;
  await client.query(sqlSetFalse);
  return (await client.query(sqlSetTrue, [title])).rows[0];
}

const updateIntro = async (params) => {
  let sql = `
  UPDATE intro
  SET `;
  let pos = 1;
  const args = [];
  for (let key in params) {
    if (key !== 'title') {
      sql += ` ${key} = $${pos.toString()}`;
      if (pos < (Object.keys(params).length - 1)) {
        sql += ',';
      }
      args.push(params[key]);
      pos++;
    }
  }
  sql += `
  WHERE title = $${pos.toString()}
  RETURNING *`;
  args.push(params.title);
  return (await client.query(sql, args)).rows[0];
}

const deleteIntro = async ({ title }) => {
  const sql = `
  DELETE FROM intro
  WHERE title = $1`;
  await client.query(sql, [title]);
}

module.exports = {
  createIntro,
  readAllIntros,
  readCurrentIntro,
  readIntroByTitle,
  setCurrentIntro,
  updateIntro,
  deleteIntro
}

