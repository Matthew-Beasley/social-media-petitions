const { deleteUser } = require('../data/crud/users');
const {
  createPetitions,
  readPetition,
  readAllPetitions,
  deletePetition
} = require('../data/crud/petitions');
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const {
  authorizeAdmin,
  authorizeUser,
  headers
} = require('./testAuthorization');

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
  await deletePetition({ title: 'Donald Trump is a despot' })
});

