import axios from 'axios';
import React, { useEffect, useState } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    axios.get('/news/topheadlines?country=us&q=&catagory=politics&language=en')
      .then((response) => {
        if (!isCancelled) {
          setArticles(response.data.articles);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <div id="news-container">
      <ul id="news-list">
        {articles.map(article => {
            return (
              <li key={article.title}>
                <img className="news-image" src={article.urlToImage ? article.urlToImage : './assets/default-article-image.jpg'} />
                <div className="news-content">
                  <div className="news-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></div>
                  <div className="news-description">{article.description}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default News;
