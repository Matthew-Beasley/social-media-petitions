import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const News = ({ petitions, setTrigger, startTime, endTime, trigger }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < petitions.length; i++) {
      console.log(petitions[i].topic)
      promises.push(axios.get(`/news/everything?q=${petitions[i].topic.replace(/,/g, '')}&from=${startTime}&to=${endTime}&pageSize=5`));
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