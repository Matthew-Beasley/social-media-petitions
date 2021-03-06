const {
  createSignature,
  readSignatures,
  readSignaturesByPetition,
  readMySignatures,
  deleteSignature
} = require('../data/crud/signatures');
const {
  client
} = require('./testUtils');

const sqlDeleteAllForEmail = async (email) => {
  const sql = `
  DELETE FROM signatures
  WHERE email = '${email}'`;
  await client.query(sql);
}

const sqlCreateSignature = async (topic, email) => {
  const sql = `
  INSERT INTO signatures (topic, email)
  VALUES ('${topic}', '${email}')`;
  await client.query(sql);
}

const sqlDeleteUserByEmail = async (email) => {
  const sql = `
  DELETE FROM users
  WHERE email = '${email}'`;
  await client.query(sql);
}

const sqlCreatePetition = async (topic, shortText, longText, current) => {
  const sql = `
  INSERT INTO petitions (topic, "shortText", "longText", current)
  VALUES ('${topic}', '${shortText}', '${longText}', '${current}')`;
  await client.query(sql);
}

const sqlDeletePetition = async (topic) => {
  const sql = `
  DELETE FROM petitions
  WHERE topic = '${topic}'`;
  await client.query(sql);
}

afterEach(async () => {
  await sqlDeleteAllForEmail('jasper5678@email.com');
  await sqlDeleteUserByEmail('jasper5678@email.com');
});

beforeAll(() => {
  client.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('pg connected')
    }
  });
});

afterAll(() => {
  client.end(err => {
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
});

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
  await sqlCreateSignature('A problem', 'jasper5678@email.com')
  const signatures = await readSignatures();
  let isThere = false;
  signatures.forEach(signature => {
    if (signature.email === 'jasper5678@email.com') {
      isThere = true;
    }
  });
  expect(isThere).toEqual(true);
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

test('crud Signatures, readMySignatures', async () => {
  await sqlCreateSignature('A problem', 'jasper5678@email.com');
  await sqlCreatePetition('A problem', 'short', 'long', 'true');
  const signatures = await readMySignatures('jasper5678@email.com');
  await sqlDeletePetition('A problem');
  const results = signatures.reduce((acc, item) => {
    if (item.email === 'jasper5678@email.com') {
      acc.push(item);
    }
    return acc;
  }, []);
  expect(results.length).toEqual(1);
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
