const express = require('express');
const {
  createPetition,
  readAllPetitions,
  deletePetition
} = require('../data/crud/suggestions');
const { isLoggedIn } = require('../data/auth');
const suggestionRouter = express.Router();

suggestionRouter.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const response = await createPetition(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

suggestionRouter.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const suggestions = await readAllPetitions();
    res.status(200).send(suggestions);
  } catch (error) {
    next(error);
  }
})

suggestionRouter.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    await deletePetition(req.query.topic);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = suggestionRouter;
