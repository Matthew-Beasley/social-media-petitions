const axios = require('axios');
const express = require('express');
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const newsRouter = express.Router();

const topHeadlinesEndPoint = 'https://newsapi.org/v2/top-headlines';
const everythingEndPoint = 'https://newsapi.org/v2/everything';
const apiKey = 'apiKey=c30ad051e9e6471490d1c763659adc0b';

const checkCache = (req, res, next) => {
  const key = req.originalUrl;
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

newsRouter.get('/everything', checkCache, async (req, res, next) => {
  const key = `${everythingEndPoint}?q=${req.query.q ? req.query.q : ''}&${apiKey}`;
  try {
    const articles = await axios.get(key);
    console.log('served up by route')
    console.log(key)
    redisClient.set(req.originalUrl, JSON.stringify(articles.data));
    redisClient.expire(req.originalUrl, 1800);
    res.status(200).json(articles.data);
  } catch (error) {
    next(error);
  }
});

newsRouter.get('/topheadlines', checkCache, async (req, res, next) => {
  const key = `${topHeadlinesEndPoint}?language=${req.query.language ? req.query.language : ''}&country=${req.query.country ? req.query.country : ''}&category=${req.query.catagory ? req.query.catagory : ''}&${apiKey}`;
  try {
    const articles = await axios.get(key);
    console.log('served up by route')
    redisClient.set(req.originalUrl, JSON.stringify(articles.data));
    redisClient.expire(req.originalUrl, 1800);
    res.status(200).json(articles.data);
  } catch (error) {
    next(error);
  }
});

module.exports = newsRouter;
