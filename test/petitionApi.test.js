const { deleteUser } = require('../data/crud/users');
const {
  client
} = require('./testUtils');
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

beforeAll(() => {
  client.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('pg connected')
    }
  });
});

afterAll(async () => {
  await deleteUser({ email: 'sam@email.com' });
  const sql1 = `
  DELETE FROM petitions
  WHERE topic = 'Little dogs are fluffy'`;
  const sql2 = `
  DELETE FROM petitions
  WHERE topic = 'Dogs are fluffy'`;
  await client.query(sql1);
  await client.query(sql2)
  client.end(err => {
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
});

afterEach(async () => {
  await deleteUser({ email: 'sam@email.com' });
  const sql = `
  DELETE FROM petitions
  WHERE topic = 'Little dogs are fluffy'`;
  await client.query(sql);
  const sql1 = `
  DELETE FROM petitions
  WHERE topic = 'Dogs are fluffy'`;
  await client.query(sql);
  await client.query(sql1)
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
  const testResults = petitions.data.reduce((acc, item) => {
    if (item.topic === 'Little dogs are fluffy' || item.topic === 'Dogs are fluffy') {
      acc.push(item);
    }
    return acc;
  }, [])
  expect(testResults.length).toEqual(2);
});

test('petitions api readUnsignedPetitions', async () => {
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
  const sqlinsert = `
  INSERT INTO signatures (topic, email)
  VALUES ('Dogs are fluffy', 'jasper321@email.com')`;
  await client.query(sqlinsert);
  await authorizeUser();
  const petitions = await axios.get(url + '/petition/unsigned?email=jasper321%40email%2Ecom', headers());
  const sqldelete = `
  DELETE FROM signatures
  WHERE topic = 'Dogs are fluffy'`;
  await client.query(sqldelete);
  let test = false;
  for (let i = 0; i < petitions.data.length; i++) {
    if (petitions.data[i].topic === 'Dogs are fluffy') {
      test = true;
    }
  }
  expect(test).toEqual(false);
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
  await axios.delete(url + '/petition?topic=Little%20dogs%20are%20fluffy', headers());
  const petition = await readPetition({ topic: 'Little dogs are fluffy' })
  expect(petition).toEqual(undefined);
});

