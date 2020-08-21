const {
  createPetition,
  readPetition,
  readAllPetitions,
  updatePetition,
  deletePetition
} = require('../data/crud/petitions');

afterEach(async () => {
  await deletePetition({ topic: 'Trump Lies' });
});

test('crud Petitions createPetitions', async () => {
  const petition = await createPetition({
    topic: 'Trump Lies',
    shortText: 'Trump is a despot',
    longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
    current: true
  });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      shortText: 'Trump is a despot'
    })
  )
});

test('crud Petitions readPetition', async () => {
  await createPetition({
    topic: 'Trump Lies',
    shortText: 'Trump is a despot',
    longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
    current: true });
  const petition = await readPetition({ topic: 'Trump Lies' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      shortText: 'Trump is a despot'
    })
  )
});

test('crud Petitions readAllPetitions', async () => {
  await createPetition({
    topic: 'Trump Lies',
    shortText: 'Trump is a despot',
    longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
    current: true });
  const petitions = await readAllPetitions();
  expect(petitions.length).toBeGreaterThan(0);
});

test('crud Petitions updatePetition', async () => {
  await createPetition({
    topic: 'Trump Lies',
    shortText: 'Trump is a despot',
    longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
    current: true });
  await updatePetition({
    topic: 'Trump Lies',
    shortText: 'Trump should never have been elected',
  });
  const petition = await readPetition({ topic: 'Trump Lies' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      shortText: 'Trump should never have been elected',
      longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
      current: true
    })
  )
});

test('crud Petitions deletePetition', async () => {
  await createPetition({
    topic: 'Trump Lies',
    shortText: 'Trump is a despot',
    longText: 'Trumps efforts to subvert the election is the beginning of the end for the US',
    current: true });
  await deletePetition({ topic: 'Trump Lies' });
  const petition = await readPetition({ topic: 'Trump Lies' });
  expect(petition).toEqual(undefined);
});
