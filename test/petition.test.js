const {
  createPetitions,
  readPetition,
  readAllPetitions,
  deletePetition
} = require('../data/crud/petitions');

afterEach(async () => {
  await deletePetition({ topic: 'Trump Lies' });
})

test('crud Petitions createPetitions', async () => {
  const petition = await createPetitions({ topic: 'Trump Lies', text: 'Trump is a pathalogical liar' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      text: 'Trump is a pathalogical liar'
    })
  )
})

test('crud Petitions readPetition', async () => {
  await createPetitions({ topic: 'Trump Lies', text: 'Trump is a pathalogical liar' });
  const petition = await readPetition({ topic: 'Trump Lies' });
  expect(petition).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      text: 'Trump is a pathalogical liar'
    })
  )
})

test('crud Petitions readAllPetitions', async () => {
  await createPetitions({ topic: 'Trump Lies', text: 'Trump is a pathalogical liar' });
  const petitions = await readAllPetitions();
  expect(petitions[0]).toEqual(
    expect.objectContaining({
      topic: 'Trump Lies',
      text: 'Trump is a pathalogical liar'
    })
  )
})