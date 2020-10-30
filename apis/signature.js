const express = require('express');
const signatureRouter = express.Router();
const {
  createSignature, 
  readSignatures,
  readSignaturesByPetition,
  readMySignatures,
  deleteSignature
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

signatureRouter.get('/byemail',  isLoggedIn, async (req, res, next) => {
  try {
    const signatures = await readMySignatures(req.query.email, req.query.topic);
    res.status(200).send(signatures)
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

signatureRouter.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      topic: req.query.topic,
      email: req.query.email
    }
    await deleteSignature(params);
    res.status(201).send('deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = signatureRouter;
