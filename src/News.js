import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const News = ({ petitions }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < petitions.length; i++) {
      promises.push(axios.get(`/news/everything?q=${petitions[i].topic}`));
    }
    if (promises.length === 0) {
      promises.push(axios.get('/news/everything?q=politics'))
    }
    Promise.all(promises)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          setArticles([...articles, ...values[i].data.articles]);
        }
      })
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
