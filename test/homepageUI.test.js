const { Builder, Key, By, until } = require('selenium-webdriver');
const {
  client
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

const logIn = async (user, pwd, driver) => {
  const email = await driver.findElement(By.id('email'));
  await email.sendKeys(user);
  const password = await driver.findElement(By.id('password'));
  await password.sendKeys(pwd);
  await driver.wait(until.elementLocated(By.id('submit')), 50000);
  const submit = await driver.findElement(By.id('submit'));
  await submit.click();
  await driver.wait(until.elementLocated(By.id('home-link')), 50000);
}

test('get app title', async () => {
  await driver.get('http://localhost:3000/');
  const title = await (await driver).getTitle();
  expect(title).toEqual('Our Voice');
})

test('populate email input', async () => {
  await driver.get('http://localhost:3000/');
  const element = await driver.findElement(By.id('email'));
  await element.sendKeys('jasper3467@email.com');
  const value = await element.getAttribute('value');
  await driver.findElement(By.id('email')).clear();
  expect(value).toEqual('jasper3467@email.com');
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
  await email.sendKeys('jasper3467@email.com');
  const password = await driver.findElement(By.id('password'));
  await password.sendKeys('jasper');
  await driver.wait(until.elementLocated(By.id('submit')), 50000);
  const submit = await driver.findElement(By.id('submit'));
  await submit.click();
  await driver.wait(until.elementLocated(By.id('home-link')), 50000);
  const token = await driver.executeScript('return window.localStorage.getItem("token")');
  await driver.executeScript('localStorage.removeItem("token")');
  expect(token).toBeTruthy();
})

test('')
