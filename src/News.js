import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const News = ({ petitions }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    //use promise all to loop through petitions array, and build query
    /*
     for (let i = 0; i < tagsArr.length; i++) {
    promises.push(axios.get(`${hatchwayAPI}?tag=${tagsArr[i]}`))
  }
  const results = await Promise.all(promises);
  for (let i = 0; i < results.length; i++) {
    postsList = [...postsList, ...results[i].data.posts]
  }
  */
    if (!isCancelled) {
      for (let i = 0; i < petitions.length; i++) {
        axios.get(`/news/everything?q=${petitions[i].topic}`)
          .then(response => { setArticles([...articles, ...response.data.articles]); console.log(response.data.articles) });
      }
      return () => {
        isCancelled = true;
      }
    }
    /*
    axios.get('/news/topheadlines?country=us&q=&catagory=politics&language=en')
      .then((response) => {
        if (!isCancelled) {
          setArticles(response.data.articles);
        }
      });
    return () => {
      isCancelled = true;
    }; */
  }, [petitions]);

  return (
    <div id="news-container">
      <ul id="news-list">
        {articles.map(article => {
          //console.log(article)
            return (
              <li key={uuidv4()}>

                <img className="news-image" src={article.urlToImage ? article.urlToImage : './assets/default-article-image.jpg'} />
                <div className="news-content">
                  <div className="news-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></div>
                  <div className="news-description">{article.description}</div>
                </div>
              </li>
            )
          })})
      </ul>
    </div>
  )
}

export default News;
