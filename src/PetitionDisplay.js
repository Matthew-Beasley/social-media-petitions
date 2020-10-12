import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionDisplay = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    axios.get('/petition/current')
      .then((response) => {
        if (!isCancelled) {
          setTopics(response.data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div id="petition-display-container">
      <ul>
      {topics.map(topic => {
        return (
          <li key={topic.id}>
            <div className="petition-topic">{topic.topic}</div>
            <div className="petition-shorttext">{topic.shortText}</div>
            <div className="petition-longtext">{topic.longText}</div>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default PetitionDisplay;
