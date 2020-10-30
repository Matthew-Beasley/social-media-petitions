import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionDisplay = ({ petitions, setPetitions }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];

  useEffect(() => {
    let isCancelled = false;
    axios.get('/petition/current')
      .then((response) => {
        if (!isCancelled) {
          setPetitions(response.data);
          forceUpdate();
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div id="petition-display-container">
      <ul>
      {petitions.map(topic => {
        return (
          <li key={topic.id}>
            <div className="petition-topic">{topic.topic}</div>
            <div className="petition-shorttext">{topic.shortText}</div>
          </li>
        )
      })}
      </ul>
      <hr id="petition-display-hr" />
    </div>
  )
}

export default PetitionDisplay;
