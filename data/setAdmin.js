const client = require('./client');

const setConbecToAdmin = async () => {
  const sql = `
  UPDATE users
  SET "isAdmin" = true
  WHERE email = 'conbec@outlook.com'`;
  await client.query(sql);
}

module.exports = { setConbecToAdmin };
