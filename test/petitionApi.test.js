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
  WHERE topic = 'Donald Trump is a ruthless despot'`;
  await client.query(sql);
});

test('petitions api createPetition', async () => {
  const params = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: true
  }
  await authorizeAdmin();
  const petition = await axios.post(url + '/petition', params, headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Donald Trump is a ruthless despot',
      shortText: 'Trump is subverting everything sacred in the US',
      longText: 'What more is there to say than he is dangerous',
      current: true
    })
  )
});

test('petitions api readPetition', async () => {
  const params = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: true
  }
  await createPetition(params);
  await authorizeUser();
  const petition = await axios.get(url + '/petition?topic=Donald Trump is a ruthless despot', headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Donald Trump is a ruthless despot',
      shortText: 'Trump is subverting everything sacred in the US',
      longText: 'What more is there to say than he is dangerous',
      current: true
    })
  )
});

test('petitions api readAllPetitions', async () => {
  const params1 = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: true
  }
  const params2 = {
    topic: 'Donald Trump Lies',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: false
  }
  await createPetition(params1);
  await createPetition(params2);
  await authorizeUser();
  const petitions = await axios.get(url + '/petition', headers());
  expect(petitions.data.length).toBeGreaterThan(1);
  const sql = `
  DELETE FROM petitions
  WHERE topic = 'Donald Trump Lies'`;
  await client.query(sql);
});

test('petitions api updatePetition', async () => {
  const params = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: true
  }
  const updateParams = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'What a joke',
    current: false
  }
  await createPetition(params);
  await authorizeAdmin();
  const petition = await axios.put(url + '/petition', updateParams, headers());
  expect(petition.data).toEqual(
    expect.objectContaining({
      topic: 'Donald Trump is a ruthless despot',
      shortText: 'What a joke',
      longText: 'What more is there to say than he is dangerous',
      current: false
    })
  )
});

test('petitions api deletePetition', async () => {
  const params = {
    topic: 'Donald Trump is a ruthless despot',
    shortText: 'Trump is subverting everything sacred in the US',
    longText: 'What more is there to say than he is dangerous',
    current: true
  }
  await createPetition(params);
  await authorizeAdmin();
  await axios.delete(url + '/petition?topic=Donald%20Trump%20is%20a%20despot', headers());
  const petition = await readPetition({ topic: 'Donald Trump is a ruthless despot' })
  expect(petition.data).toEqual(undefined);
});

