const express = require('express');
const redis = require('redis')
const redisClient = redis.createClient();
const newsRouter = express.Router();

checkCache = (req, res, next) => {
  const { id } = req.params;
  //get data value for key =id
  redisClient.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data !== null) {
      res.send(data);
    }
    else {
      next();
    }
  });
};


module.exports = newsRouter;
