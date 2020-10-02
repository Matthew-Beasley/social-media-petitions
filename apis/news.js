const axios = require('axios');
const express = require('express');
//const redis = require('redis')
//const redisClient = redis.createClient();
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const newsRouter = express.Router();

const endPoint = 'https://newsapi.org/v2/top-headlines?country=us&catagory=';
const apiKey = '&apiKey=c30ad051e9e6471490d1c763659adc0b';

const checkCache = (req, res, next) => {
  const key = `${endPoint}${req.query.arg}${apiKey}`;
  redisClient.get(key, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else if (data) {
      res.send(data);
    }
    else {
      next();
    }
  });
};

newsRouter.get('/topics', checkCache, async (req, res, next) => {
  const key = `${endPoint}${req.query.arg}${apiKey}`;
  try {
    const articles = await axios.get(`${key}`);
    redisClient.set(key, JSON.stringify(articles.data));
    redisClient.expire(arg, 43200);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

module.exports = newsRouter;
