const {
  createIntro,
  readeAllIntros,
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
  const intros = await readeAllIntros();
  expect(intros[0]).toEqual(
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

test('crud Intro, readAllIntros', async () => {
  await createIntro({ title: 'Title', text: 'This is the text of a problem' });
  const intros = await updateIntro();
  expect(intros[0]).toEqual(
    expect.objectContaining({
      title: 'Title',
      text: 'This is the text of a problem'
    })
  )
})
