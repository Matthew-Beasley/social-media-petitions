const express = require('express');
const createSignature = require('../data/crud/signatures');
const signatureRouter = express.Router();

signatureRouter.post('/', async (req, res, next) => {
  try {
    const record = await createSignature(req.body);
    res.status(201).send(record);
  } catch (error) {
    next(error);
  }
});

module.exports = signatureRouter;
