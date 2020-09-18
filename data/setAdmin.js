const client = require('./client');

const setConbecToAdmin = async () => {
  sql = `
  UPDATE users
  SET "isAdmin" = true
  WHERE email = 'conbec@outlook.com'`;
  await client.query(sql);
}

module.exports = { setConbecToAdmin };
