const {
  getElementXpath,
  getElementName,
  getElementId
} = require('./testUtils')
const webdriver = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome')

let driver;

beforeAll(() => {
  driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
})

afterAll(async () => {
  await driver.quit();
})

test('get search box contents', async () => {
  await driver.get('http://localhost:3000/');
  const title = await (await driver).getTitle();
  console.log('The title is ', title);
  expect(title).toEqual('Our Voice');
})
