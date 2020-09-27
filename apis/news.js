const axios = require('axios');
const express = require('express');
const redis = require('redis')
const redisClient = redis.createClient();
const newsRouter = express.Router();

const endPoint = 'https://newsapi.org/v2/everything?q=';
const apiKey = '&apiKey=c30ad051e9e6471490d1c763659adc0b';

const checkCache = (req, res, next) => {
  console.log('in checkcache ', req.query.arg)
  redisClient.get(req.query.arg, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else if (data) {
      console.log('served up by redis!')
      res.send(data);
    }
    else {
      next();
    }
  });
};

//https://newsapi.org/v2/everything?q=bitcoin&apiKey=c30ad051e9e6471490d1c763659adc0b

newsRouter.get('/topics', checkCache, async (req, res, next) => {
  const arg = req.query.arg;
  try {
    const articles = await axios.get(`${endPoint}${arg}${apiKey}`);
    redisClient.set(arg, JSON.stringify(articles.data));
    redisClient.expire(arg, 43200);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

module.exports = newsRouter;
