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
