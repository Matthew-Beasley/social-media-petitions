const express = require('express');
const {
  createSuggestion,
  readMySuggestions,
  readAllSuggestions,
  deleteSuggestion,
} = require('../data/crud/suggestions');
const { isLoggedIn, isAdmin } = require('../data/auth');
const suggestionRouter = express.Router();

suggestionRouter.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const response = await createSuggestion(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

suggestionRouter.get('/byemail', isLoggedIn, async (req, res, next) => {
  try {
    const suggestions = await readMySuggestions(req.query.email);
    res.status(200).send(suggestions);
  } catch (error) {
    next(error);
  }
});

suggestionRouter.get('/', isAdmin, async (req, res, next) => {
  try {
    const suggestions = await readAllSuggestions();
    res.status(200).send(suggestions);
  } catch (error) {
    next(error);
  }
});

suggestionRouter.delete('/', isAdmin, async (req, res, next) => {
  try {
    await deleteSuggestion(req.query.topic);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = suggestionRouter;
