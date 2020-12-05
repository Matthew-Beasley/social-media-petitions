import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { triggerState, startTimeState, endTimeState } from './State';
import { v4 as uuidv4 } from 'uuid';

const News = ({ petitions }) => {
  const [articles, setArticles] = useState([]);
  const [trigger, setTrigger] = useRecoilState(triggerState);
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < petitions.length; i++) {
      promises.push(axios.get(`/news/everything?q=${petitions[i].topic.replace(/,/g, '')}&from=${startTime}&to=${endTime}&pageSize=5`));
    }
    console.log(promises.length)
    if (promises.length < 6) {
      promises.push(axios.get(`/news/everything?q=politics&from=${startTime}&to=${endTime}&pageSize=5`));
    }
    const contents = [];
    Promise.all(promises)
      .then(items => {
        for (let i = 0; i < items.length; i++) {
          contents.push(...items[i].data.articles);
        }
        setArticles([...contents]);
      });
  }, [petitions]);

  useEffect(() => {
    setTrigger(Math.random());
  }, []);

  return (
    <div id="news-container">
      <ul id="news-list">
        {articles.map(article => {
          return (
            <li key={uuidv4()}>
              <img className="news-image" src={article.urlToImage ? article.urlToImage : './assets/default-article-image.jpg'} />
              <div className="news-content">
                <div className="news-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></div>
                <div className="news-description">{article.description}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default News;
