import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionDisplay = ({ petitions, setPetitions, setTrigger }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const [toggle, setToggle] = useState(false);

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

  useEffect(() => {
    setTrigger(Math.random())
  }, [])

  return (
    <div id="petition-display-container">
      <ul>
      {petitions.map(topic => {
        return (
          <li key={topic.id} className="petition-display-li">
            <div className="petition-topic">{topic.topic}</div>
            <div className="petition-shorttext">{topic.shortText}</div>
            {toggle ? <div className="long-text">{topic.longText}</div> : null}
            {toggle ? <div className="arrow" onClick={() => setToggle(false)}>&#9651;</div> :
              <div className="arrow" onClick={() => setToggle(true)}>&#9661;</div>}
          </li>
        )
      })}
      </ul>
      <hr id="petition-display-hr" />
    </div>
  )
}

export default PetitionDisplay;
