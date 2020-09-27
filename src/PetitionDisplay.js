import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionDisplay = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('/petition/current')
      .then(response => setTopics(response.data))
  }, []);
  useEffect(() => {
    axios.get('/news/topics?arg=trump')
      .then(response => console.log(response.data));
  }, [])
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
