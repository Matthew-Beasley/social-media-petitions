const {
  createSignature,
  readSignatures,
  readSignaturesByPetition,
  deleteSignature
} = require('../data/crud/signatures');

const { TestScheduler } = require('jest');

afterEach(async () => {
  await deleteSignature({ userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6' });
})

test('crud Signatures, createSignature', async () => {
  const signature = await createSignature({ topic: 'A problem', userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6' });
  expect(signature).toEqual(
    expect.objectContaining({
      topic: 'A problem',
      userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
    })
  )
})

test('crud Signatures, readSignatures', async () => {
  const signature = await createSignature({ topic: 'A problem', userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6' });
  const readSignature = await readSignatures();
  expect(signature).toEqual(readSignature[0]);
})

test('crud Signature, readSignatureByPetition', async () => {
  await createSignature({ topic: 'A problem', userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6' });
  const petition = await readSignaturesByPetition({ topic: 'A problem' });
  expect(petition[0]).toEqual(
    expect.objectContaining({
      topic: 'A problem',
      userId: '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
    })
  )
})
