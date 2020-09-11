const {
  createPetition,
  readPetition,
  readAllPetitions,
  updatePetition,
  deletePetition
} = require('../data/crud/petitions');

afterEach(async () => {
  await deletePetition({ topic: 'Dogs are fluffy' });
});

test('crud Petitions createPetitions', async () => {
  const petition = await createPetition({
    topic: 'Dogs are fluffy',
    shortText: 'I would have 2 dogs if I could',
    longText: 'I have a dog named chief. He is a sweet heart!',
    current: true
  });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Dogs are fluffy',
      shortText: 'I would have 2 dogs if I could'
    })
  )
});

test('crud Petitions readPetition', async () => {
  await createPetition({topic: 'Dogs are fluffy',
    shortText: 'I would have 2 dogs if I could',
    longText: 'I have a dog named chief. He is a sweet heart!',
    current: true });
  const petition = await readPetition({ topic: 'Dogs are fluffy' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Dogs are fluffy',
      shortText: 'I would have 2 dogs if I could'
    })
  )
});

test('crud Petitions readAllPetitions', async () => {
  await createPetition({topic: 'Dogs are fluffy',
    shortText: 'I would have 2 dogs if I could',
    longText: 'I have a dog named chief. He is a sweet heart!',
    current: true });
  const petitions = await readAllPetitions();
  expect(petitions.length).toBeGreaterThan(0);
});

test('crud Petitions updatePetition', async () => {
  await createPetition({topic: 'Dogs are fluffy',
    shortText: 'I would have 2 dogs if I could',
    longText: 'I have a dog named chief. He is a sweet heart!',
    current: true });
  await updatePetition({
    topic: 'Dogs are fluffy',
    shortText: 'I would love another dog',
  });
  const petition = await readPetition({ topic: 'Dogs are fluffy' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Dogs are fluffy',
      shortText: 'I would love another dog',
      longText: 'I have a dog named chief. He is a sweet heart!',
      current: true
    })
  )
});

test('crud Petitions deletePetition', async () => {
  await createPetition({topic: 'Dogs are fluffy',
    shortText: 'I would have 2 dogs if I could',
    longText: 'I have a dog named chief. He is a sweet heart!',
    current: true });
  await deletePetition({ topic: 'Dogs are fluffy' });
  const petition = await readPetition({ topic: 'Dogs are fluffy' });
  expect(petition).toEqual(undefined);
});
