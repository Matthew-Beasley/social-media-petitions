const { deleteUser } = require('../data/crud/users');
const client = require('../data/client');
const {
  createPetition,
  readPetition,
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
  const sql = `
  DELETE FROM petitions
  WHERE topic = 'Little dogs are fluffy'`;
  await client.query(sql);
});

test('petitions api createPetition', async () => {
  const params = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  await authorizeAdmin();
  const petition = await axios.post(url + '/petition', params, headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Little dogs are fluffy',
      shortText: 'You need to feed dogs every day',
      longText: 'Dogs need a food with fewer ingredients and a grain',
      current: true
    })
  )
});

test('petitions api readPetition', async () => {
  const params = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  await createPetition(params);
  await authorizeUser();
  const petition = await axios.get(url + '/petition?topic=Little dogs are fluffy', headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Little dogs are fluffy',
      shortText: 'You need to feed dogs every day',
      longText: 'Dogs need a food with fewer ingredients and a grain',
      current: true
    })
  )
});

test('petitions api readAllPetitions', async () => {
  const params1 = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  const params2 = {
    topic: 'Dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: false
  }
  await createPetition(params1);
  await createPetition(params2);
  await authorizeUser();
  const petitions = await axios.get(url + '/petition', headers());
  const sql = `
  DELETE FROM petitions
  WHERE topic = 'Dogs are fluffy'`;
  await client.query(sql);
  expect(petitions.data.length).toBeGreaterThan(1);
});

test('petitions api readCurrentPetitions', async () => {
  const params1 = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  const params2 = {
    topic: 'Dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: false
  }
  await createPetition(params1);
  await createPetition(params2);
  await authorizeUser();
  const petitions = await axios.get(url + '/petition/current', headers());
  const sql = `
  DELETE FROM petitions
  WHERE topic = 'Dogs are fluffy'`;
  await client.query(sql);
  const petition = petitions.data.reduce((acc, item) => {
    if (item.current === true && item.topic === 'Little dogs are fluffy') {
      acc = item;
    }
    return acc;
  })
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Little dogs are fluffy',
      shortText: 'You need to feed dogs every day',
      longText: 'Dogs need a food with fewer ingredients and a grain',
      current: true
    })
  );
});

test('petitions api updatePetition', async () => {
  const params = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  const updateParams = {
    topic: 'Little dogs are fluffy',
    shortText: 'What a joke',
    current: false
  }
  await createPetition(params);
  await authorizeAdmin();
  const petition = await axios.put(url + '/petition', updateParams, headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Little dogs are fluffy',
      shortText: 'What a joke',
      longText: 'Dogs need a food with fewer ingredients and a grain',
      current: false
    })
  )
});

test('petitions api deletePetition', async () => {
  const params = {
    topic: 'Little dogs are fluffy',
    shortText: 'You need to feed dogs every day',
    longText: 'Dogs need a food with fewer ingredients and a grain',
    current: true
  }
  await createPetition(params);
  await authorizeAdmin();
  await axios.delete(url + '/petition?topic=Donald%20Trump%20is%20a%20despot', headers());
  const petition = await readPetition({ topic: 'Little dogs are fluffy' })
  expect(petition.data).toEqual(undefined);
});

