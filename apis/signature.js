const express = require('express');
const signatureRouter = express.Router();
const {
  createSignature,
  getSignaturesByPetition
} = require('../data/crud/signatures');

signatureRouter.post('/', async (req, res, next) => {
  try {
    const record = await createSignature(req.body);
    console.log('record in post route', record)
    res.status(201).send(record);
  } catch (error) {
    next(error);
  }
});

signatureRouter.get('/:topic', async (req, res, next) => {
  try {
    const { topic } = req.params;
    const records = await getSignaturesByPetition(topic);
    res.status(200).send(records);
  } catch (error) {
    next(error);
  }
})

module.exports = signatureRouter;
