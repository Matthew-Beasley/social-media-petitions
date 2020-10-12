import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const UserPetitionDisplay = () => {
  const [petitions, setPetitions] = useState([]);
  const forceUpdate = React.useReducer(() => ({}))[1]

  useEffect(() => {
    let isCancelled = false;
    axios.get('/petition/current')
      .then((response) => {
        if (!isCancelled) {
          setPetitions(response.data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    petitions.forEach(petition => {
      axios.get(`/news/topics?arg=${petition.topic}`)
        .then(response => {
          petition.news = response.data.articles[0];
          forceUpdate();
        })
    });
  }, [petitions]);

  return (
    <div id="user-petition-container">
      <ul id="user-petition-list">
        {petitions.map(petition => {
          return (
            <li key={petition.topic} className="user-petition">
              <div className="petition-topic">{petition.topic}</div>
              <div className="petition-shorttext">{petition.shortText}</div>
              <div className="petition-longtext">{petition.longText}</div>
              {!!petition.news &&
                <div id="petition-newsitem">
                  <img className="news-image" src={petition.news.urlToImage ? petition.news.urlToImage : './assets/default-article-image.jpg'} />
                  <div className="news-content">
                  <div className="news-title"><a href={petition.news.url} target="_blank" rel="noopener noreferrer">{petition.news.title}</a></div>
                    <div className="news-description">{petition.news.description}</div>
                  </div>
                </div>
              }
            </li>
          )})}
      </ul>
    </div>
  )
}

export default UserPetitionDisplay;
