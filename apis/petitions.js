const express = require('express');
const {
  createPetition,
  readPetition,
  readAllPetitions,
  readCurrentPetitions,
  updatePetition,
  deletePetition
} = require('../data/crud/petitions');
const { isAdmin, isLoggedIn } = require('../data/auth');
const petitionRouter = express.Router();

petitionRouter.post('/', isAdmin, async (req, res, next) => {
  try {
    const response = await createPetition(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

petitionRouter.get('/', isLoggedIn, async (req, res, next) => {
  try {
    let response = undefined;
    if (req.query.topic) {
      response = await readPetition(req.query);
    } else if (!req.query.topic) {
      response = await readAllPetitions();
    }
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

petitionRouter.get('/current', async (req, res, next) => {
  try {
    const petitions = await readCurrentPetitions();
    res.status(200).send(petitions);
  } catch (error) {
    next(error);
  }
});

petitionRouter.put('/', isAdmin, async (req, res, next) => {
  try {
    const response = await updatePetition(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

petitionRouter.delete('/', isAdmin, async (req, res, next) => {
  try {
    await deletePetition(req.query.topic);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = petitionRouter;
