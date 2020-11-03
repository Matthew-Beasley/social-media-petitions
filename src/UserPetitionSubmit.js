import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';


const UserPetitionSubmit = (history, headers) => {
  const [isDropped, setIsDropped] = useState(false);
  const [topic, setTopic] = useState('');
  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [current, setCurrent] = useState(false);
  const [createSuccessful, setCreateSuccessful] = useState(false);
  const [petitions, setPetitions] = useState([]);

  const submitPetition = async () => {
    const petition = await axios.post('/petition', //change this to the new user petition table route
      { topic, shortText, longText, current },
      headers());
    setPetitions([...petitions, petition.data]);
    if (petition.data.topic === topic) {
      setCreateSuccessful(true);
    }
    setTopic('');
    setShortText('');
    setLongText('');
    setCurrent(false);
  }

  const setDropDown = () => {
    if (isDropped === true) {
      setIsDropped(false);
    } else {
      setIsDropped(true);
    }
  }

  return (
    <div id="user-submit-container">
      <div id="user-submit-launch">
        {isDropped ?
        <div
          id="dropdown-link"
          onClick={() => setDropDown()}>
          &and;
        </div>
        :
        <div
          id="dropdown-link"
          onClick={() => setDropDown()}>
          &or;
        </div>}
      <div id="user-submit-text">Click arrow to submit a petition suggestion</div>
      </div>
        <div id="user-form-header">
          <p>To submit a suggestion for a petition, fill out the form below.</p>
          <p>Suggestions are ranked by frequency of appearance, and most popular petitions will be set as current.</p>
        </div>
        <form id="create-petition-form">
          {createSuccessful && <h3>Successfully created petition {topic}</h3>}
          <input
            type="text" id="admin-topic-input"
            placeholder="Topic"
            value={topic} onChange={ev => { setTopic(ev.target.value); setCreateSuccessful(false) }}
          />
          <textarea
            id="create-input-shorttext"
            spellCheck="true"
            placeholder="Short Text"
            defaultValue={topic.shortText}
            onChange={ev => { setShortText(ev.target.value); setCreateSuccessful(false) }}
            rows="3"
          />
          <textarea
            id="create-input-longtext"
            spellCheck="true"
            placeholder="Long Text"
            defaultValue={topic.longText}
            onChange={ev => { setLongText(ev.target.value); setCreateSuccessful(false) }}
            rows="10"
          />
          <label>
            <input
              type="checkbox"
              className="iscurrent"
              id="admin-current-checkbox"
              checked={current}
              onChange={ev => { setCurrent(ev.target.value); setCreateSuccessful(false) }}
            />Make this a current petition
          </label>
          <button
            type="button"
            id="admin-create-button"
            onClick={() => submitPetition()} >
            Create Petition
          </button>
        </form>
    </div>
  )
}

export default UserPetitionSubmit;
