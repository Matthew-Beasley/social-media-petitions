import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { triggerState } from './State';

const PetitionModule = ({ petition }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <li key={petition.id} className="petition-display-li">
      <div className="petition-topic">{petition.topic}</div>
      <div className="petition-shorttext">{petition.shortText}</div>
      {toggle ? <div className="petition-longtext">{petition.longText}</div> : null}
      {toggle ? <div className="arrow" onClick={() => setToggle(false)}><p>&#9651;</p></div> :
      <div className="arrow" onClick={() => setToggle(true)}>&#9661;</div>}
    </li>
  )
}

const PetitionDisplay = ({ petitions, setPetitions }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const [trigger, setTrigger] = useRecoilState(triggerState)

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
      {petitions.map(petition => {
        return (<PetitionModule petition={petition} key={petition.id} />)
      })}
      </ul>
      <hr id="petition-display-hr" />
    </div>
  )
}

export default PetitionDisplay;
