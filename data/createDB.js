const client = require('./client');

const newDB = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS petitions;
  DROP TABLE IF EXISTS signatures;
  DROP TABLE IF EXISTS intro;

  CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(128) NOT NULL,
    "userId" UUID UNIQUE NOT NULL
  );

  CREATE TABLE petitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(256) UNIQUE NOT NULL,
    text TEXT NOT NULL
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
    isAdmin BOOLEAN DEFAULT FALSE
  );
  
  CREATE TABLE intro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(256),
    text TEXT NOT NULL,
    current BOOLEAN DEFAULT FALSE
  );`;
  await client.query(sql);
}

module.exports = { newDB };
