require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const signatureRouter = require('./apis/signature');
const petitionRouter = require('./apis/petitions');
const suggestionRouter = require('./apis/suggestions');
const userRouter = require('./apis/users');
const authRouter = require('./apis/auth');
const newsRouter = require('./apis/news');
const { findUserFromToken } = require('./data/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  findUserFromToken(token)
    .then(auth => {
      req.user = auth;
      next();
    })
    .catch(ex => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/signature', signatureRouter);
app.use('/petition', petitionRouter);
app.use('/suggestion', suggestionRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (error) {
    next(error);
  }
});

//maybe rethink this error handling
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`,
  });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err),
  });
});

app.listen(PORT, () => console.log('Listening on PORT ', PORT));
