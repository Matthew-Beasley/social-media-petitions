const express = require('express'); 
const signatureRouter = require('./signature');
const petitionRouter = require('./petitions');

const apiRouter = express.Router();

apiRouter.use('/signature', signatureRouter);
apiRouter.use('/petition', petitionRouter);

module.exports = apiRouter;
