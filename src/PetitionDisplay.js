import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionDisplay = () => {
  const [topics, setTopics] = useState([]);

  useState(() => {
    axios.get('/petition')
      .then(response => setTopics(response.data))
  })
  return (
    <div id="petition-display-container">
      <ul>
      {topics.map(topic => {
        return (
          <li key={topic.topic}>
            <h1>{topic.topic}</h1>
            <div>{topic.text}</div>
            <button type="button" onClick={() => displayForm(topic.topic)}>Sign</button>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default PetitionDisplay;
