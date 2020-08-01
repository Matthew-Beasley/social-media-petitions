const {
  createIntro,
  readAllIntros,
  readCurrentIntro,
  readIntroByTitle,
  setCurrentIntro,
  updateIntro,
  deleteIntro
} = require('../data/crud/intro');
const { TestScheduler } = require('jest');

afterEach(async () => {
  await deleteIntro({ title: 'Title' });
})

test('crud Intro, createIntro', async () => {
  const intro = await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  expect(intro).toEqual(
    expect.objectContaining({
      title: 'Title',
      text: 'This is the text of a problem'
    })
  )
})

test('crud Intro, readAllIntros', async () => {
  await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  const intros = await readAllIntros();
  let index = 0;
  if (intros.length > 0) {
    for (let i = 0; i < intros.length; i++) {
      if (intros[i].title === 'Title') {
        index = i;
      }
    }
  } else {
    throw new Error('There are no intros!');
  }
  expect(intros[index]).toEqual(
    expect.objectContaining({
      title: 'Title',
      text: 'This is the text of a problem'
    })
  )
})

test('crud Intro, readCurrentIntro and setCurrentIntro', async () => {
  await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  await setCurrentIntro({ title: 'Title' })
  const current = await readCurrentIntro();
  expect(current).toEqual(
    expect.objectContaining({
      title: 'Title',
      current: true
    })
  )
})

test('crud Intro, readIntroByTitle', async () => {
  await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  const byTitle = await readIntroByTitle({ title: 'Title' })
  expect(byTitle).toEqual(
    expect.objectContaining({
      title: 'Title',
      text: 'This is the text of a problem'
    })
  )
})

test('crud Intro, updateIntros', async () => {
  await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  const intro = await updateIntro({ title: 'Title', text: 'This is another problem' });
  expect(intro).toEqual(
    expect.objectContaining({
      title: 'Title',
      text: 'This is another problem'
    })
  )
  await deleteIntro({ title: 'New Title' });
})
