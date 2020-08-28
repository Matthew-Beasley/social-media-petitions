const express = require('express');
const signatureRouter = express.Router();
const {
  createSignature, 
  readSignatures,
  readSignaturesByPetition
} = require('../data/crud/signatures');
const { isAdmin, isLoggedIn } = require('../data/auth');

signatureRouter.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const record = await createSignature(req.body);
    res.status(201).send(record);
  } catch (error) {
    next(error);
  }
});

signatureRouter.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const records = await readSignatures();
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }
});

signatureRouter.get('/:topic', isLoggedIn, async (req, res, next) => {
  try {
    const { topic } = req.params;
    const records = await readSignaturesByPetition({ topic });
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }
});

module.exports = signatureRouter;
