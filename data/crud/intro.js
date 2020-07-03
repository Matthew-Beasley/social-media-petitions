const client = require('../client');

const createIntro = async ({ title, text }) => {
  const sql = `
  INSERT INTO intro (title, text)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [title, text])).rows[0];
}

const readeAllIntros = async () => {
  const sql = `
  SELECT * FROM intro`;
  return (await client.query(sql)).rows;
}

const readIntroByTitle = async ({ title }) => {
  const sql = `
  SELECT * FROM intro
  WHERE title = $1`;
  return (await client.query(sql, [title]))
}

const readCurrentIntro = async () => {
  const sql = `
  SELECT * FROM intro
  WHERE current = TRUE`;
  return (await client.query(sql)).rows;
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
  return (await client.query(sqlSetTrue, [title])).rows;
}

const updateIntro = async ({ title, text }) => {
  const sql = `
  UPDATE intro
  SET text = $1
  WHERE title = $2
  RETURNING *`;
  return (await client.query(sql, [title, text])).rows[0];
}

const deleteIntro = async ({ title }) => {
  const sql = `
  DELETE FROM intro
  WHERE title = $1`;
  return (await client.query(sql, [title])).rows[0];
}

module.exports = {
  createIntro,
  readeAllIntros,
  readCurrentIntro,
  readIntroByTitle,
  setCurrentIntro,
  updateIntro,
  deleteIntro
}

