const express = require('express');
const authRouter = express.Router();
const {
  findUserFromToken,
  authenticate,
  compare,
  hash
} = require('../data/auth')

authRouter.get('/', async (req, res, next) => {
  try {
    const token = await authenticate(req.body)
    res.status(201).send(token);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/', async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.status(201).send(token);
  } catch (error) {
    next(error);
  }
})

module.exports = authRouter;

/*
app.post('/api/auth', (req, res, next)=> {
  db.authenticate(req.body)
    .then( token => res.send({ token }))
    .catch( ()=> {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    } );
})

*/