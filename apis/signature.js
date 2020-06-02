const express = require('express');
const signatureRouter = express.Router();
const {
  createSignature,
  getSignaturesByPetition
} = require('../data/crud/signatures');

signatureRouter.post('/', async (req, res, next) => {
  try {
    const record = await createSignature(req.body);
    res.status(201).send(record);
  } catch (error) {
    next(error);
  }
});

signatureRouter.get('/', async (req, res, next) => {
  try {
    console.log('petitionName in route ', req.body)
    const { topic } = req.body;
    const records = await getSignaturesByPetition(topic);
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }
})

module.exports = signatureRouter;
