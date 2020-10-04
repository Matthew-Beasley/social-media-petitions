const { Builder, Key, By, until } = require('selenium-webdriver');
const { Client } = require('pg');

const getElementXpath = async (driver, xpath, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

const getElementName = async (driver, name, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

const getElementId = async (driver, id, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

module.exports = {
  getElementXpath,
  getElementName,
  getElementId
}
