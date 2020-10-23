const {
  createSignature,
  readSignatures,
  readSignaturesByPetition,
  deleteSignature
} = require('../data/crud/signatures');
const client = require('../data/client')

const sqlDeleteSignature = async (email, topic) => {
  const sql = `
  DELETE FROM signatures
  WHERE email = '${email}'
  AND topic = '${topic}'`;
  /*
  DELETE FROM signatures
  WHERE email = 'matt@email.com'
  AND topic = 'A problem'
  */
  await client.query(sql);
}

afterEach(async () => {
  await sqlDeleteSignature('jasper5678@email.com', 'A problem')
})

test('crud Signatures, createSignature', async () => {
  const signature = await createSignature({ topic: 'A problem', email: 'jasper5678@email.com' });
  expect(signature).toEqual(
    expect.objectContaining({
      topic: 'A problem',
      email: 'jasper5678@email.com'
    })
  )
})

test('crud Signatures, readSignatures', async () => {
  const signature = await createSignature({
    topic: 'A problem',
    email: 'jasper5678@email.com'
  });
  const readSignature = await readSignatures();
  expect(signature).toEqual(readSignature[0]);
})

test('crud Signatures, readSignatureByPetition', async () => {
  await createSignature({
    topic: 'A problem',
    email: 'jasper5678@email.com'
  });
  const petition = await readSignaturesByPetition({ topic: 'A problem' });
  expect(petition[0]).toEqual(
    expect.objectContaining({
      topic: 'A problem',
      email: 'jasper5678@email.com'
    })
  )
})

test('crud Signatures, deleteSignature', async () => {
  await createSignature({
    topic: 'A problem',
    email: 'jasper5678@email.com'
  });
  await deleteSignature({
    topic: 'A problem',
    email: 'jasper5678@email.com'
  });
  const signature = await client.query(`
    SELECT * FROM signatures
    WHERE topic = 'A problem'
    AND email = '4f6b5196-5543-4ef4-b6b9-33414853d2b6'
  `)
  expect(signature.rows).toEqual([]);
})
