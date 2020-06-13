const client = require('../data/client');

const newDB = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS petitions;
  DROP TABLE IF EXISTS signatures;

  CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID UNIQUE
  )

  CREATE TABLE petitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(256) UNIQUE,
    text TEXT
  )

  CREATE TABLE users (
    "firstName" VARCHAR(128),
    "lastName" VARCHAR(128),
    street VARCHAR(256),
    city VARCHAR(128),
    state VARCHAR(2)
  )`;
  await client(sql);
}

module.exports = { newDB };
