const express = require('express'); 
const signatureRouter = require('./signature');

const apiRouter = express.Router();

apiRouter.use('/signature', signatureRouter);

module.exports = apiRouter;
