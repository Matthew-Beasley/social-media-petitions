const User = require('../models/userModel');

const createUser = (record) => {
  const sql = `
  INSERT `
}

const getUsers = async() => {
  const users = await User.find();
  return users;
}

module.exports = {
  createUser,
  getUsers
}
