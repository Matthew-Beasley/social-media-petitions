const express = require('express');
const userRouter = express.Router();
const {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser
} = require('../data/crud/users');
const {
  authenticate,
  findUserFromToken,
  isAdmin,
  isLoggedIn
} = require('../data/auth');

userRouter.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/email/:email', isAdmin, async (req, res, next) => {
  try { 
    const user = await getUserByEmail(req.params);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
})

userRouter.get('/:token', isAdmin, async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await findUserFromToken(token);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const val = await createUser(req.body);
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
});

userRouter.post('/update', isLoggedIn, async (req, res, next) => {
  try {
    const user = await updateUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

