const client = require('./client');

const newDB = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS petitions;
  DROP TABLE IF EXISTS signatures;

  CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL
  );

  CREATE TABLE petitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(256) UNIQUE NOT NULL,
    "shortText" TEXT NOT NULL,
    "longText" TEXT NOT NULL,
    current BOOLEAN
  );

  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(256) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    "firstName" VARCHAR(128),
    "lastName" VARCHAR(128),
    street VARCHAR(256),
    city VARCHAR(128),
    state VARCHAR(2),
    zipcode VARCHAR(10),
    "isAdmin" BOOLEAN DEFAULT FALSE
  );`;
  await client.query(sql);
}

module.exports = { newDB };
