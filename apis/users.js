const express = require('express');
const userRouter = express.Router();
const {
  createUser,
  getUsers,
  getUserByEmail
} = require('../data/crud/users');
const { authenticate } = require('../data/auth')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail({ email });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const val = await createUser(req.body)
    res.status(201).send(val);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/token', async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.status(201).send(token);
  } catch (error) {
    next(error);
  }
})

module.exports = userRouter;

