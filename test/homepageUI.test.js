const { Builder, Key, By, until } = require('selenium-webdriver');
const {
  getElementXpath,
  getElementName,
  getElementId
} = require('./testUtils')
const webdriver = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome')

let driver, js;

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

test('enter user name', async () => {
  await driver.get('http://localhost:3000/');
  const element = await driver.findElement(By.id('email'));
  await element.sendKeys('jasper@email.com');
  const value = await element.getAttribute('value');
  await driver.findElement(By.id('email')).clear();
  expect(value).toEqual('jasper@email.com');
})

test('enter user name', async () => {
  await driver.get('http://localhost:3000/');
  const element = await driver.findElement(By.id('password'));
  await element.sendKeys('jasper');
  const value = await element.getAttribute('value');
  await driver.findElement(By.id('password')).clear();
  expect(value).toEqual('jasper');
})
