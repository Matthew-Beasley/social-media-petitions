const express = require('express');
const {
  createPetitions,
  readPetitions,
  readAllPetitions
} = require('../data/crud/petitions');

const petitionsRouter = express.Router();

petitionsRouter.post('/', async (req, res, next) => {
  try {
    const response = await createPetitions(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

petitionsRouter.get('/:topic', async (req, res, next) => {
  try {
    const { topic } = req.params;
    const response = await readPetitions(topic);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

petitionsRouter.get('/', async (req, res, next) => {
  try {
    const response = await readAllPetitions();
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});


module.exports = petitionsRouter;
