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
      console.log('served by redis')
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
    console.log('served up by route')
    redisClient.set(key, JSON.stringify(articles.data));
    redisClient.expire(key, 1800);
    res.status(200).json(articles.data);
  } catch (error) {
    next(error);
  }
});

module.exports = newsRouter;
