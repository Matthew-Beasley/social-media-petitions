const { Builder, Key, By, until } = require('selenium-webdriver');
const {
  getElementXpath,
  getElementName,
  getElementId
} = require('./testUtils');
const webdriver = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')

let driver;

beforeAll(() => {
  driver = new webdriver.Builder()
  .forBrowser('chrome').build();
})

afterAll(async () => {
  await driver.quit();
})

test('get app title', async () => {
  await driver.get('http://localhost:3000/');
  const title = await (await driver).getTitle();
  expect(title).toEqual('Our Voice');
})

test('populate email input', async () => {
  await driver.get('http://localhost:3000/');
  const element = await driver.findElement(By.id('email'));
  await element.sendKeys('125jasper3467@email.com');
  const value = await element.getAttribute('value');
  await driver.findElement(By.id('email')).clear();
  expect(value).toEqual('125jasper3467@email.com');
})

test('populate password input', async () => {
  await driver.get('http://localhost:3000/');
  const element = await driver.findElement(By.id('password'));
  await element.sendKeys('jasper');
  const value = await element.getAttribute('value');
  await driver.findElement(By.id('password')).clear();
  expect(value).toEqual('jasper');
})

test('log in', async () => {
  await driver.get('http://localhost:3000/');
  const email = await driver.findElement(By.id('email'));
  await email.sendKeys('125jasper3467@email.com');
  const password = await driver.findElement(By.id('password'));
  await password.sendKeys('jasper');
  //await driver.findElement(By.id('submit')).click();
  const submit = await driver.findElement(By.id('submit'));
  //console.log('submit obj ', submit.driver_.executor_)
  await submit.click();
  //await driver.executeScript('arguments[0].click();', submit);
  //await driver.executeScript('document.querySelector("#submit").click()')
  //await driver.executeScript('window.localStorage.setItem("token", "hello")')
  //await driver.executeScript('arguments[0].click();', submit);
  //await driver.findElement(By.id("submit")).sendKeys(Key.RETURN);
  await driver.wait(until.elementLocated(By.id('home-view')), 10000);
  console.log('petition-display-container located')
  const token = await driver.executeScript('return window.localStorage.getItem("token")')
  await driver.executeScript('localStorage.removeItem("token")')
  console.log('token is ', token)
  expect(token).toBeTruthy();
})
