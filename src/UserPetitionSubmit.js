import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';


const UserPetitionSubmit = ({ history, headers, isDropped, setIsDropped }) => {
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
      {isDropped &&
      <div>
        <div id="user-form-header">
          <p>
            To submit a suggestion for a petition, fill out the form below.<br />
            Suggestions are ranked by frequency of appearance, and most popular petitions will be set as current.
          </p>
        </div>
        <form id="user-petition-form">
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
          <button
            type="button"
            id="admin-create-button"
            onClick={() => submitPetition()} >
            Create Petition
          </button>
        </form>
      </div>}
    </div>
  )
}

export default UserPetitionSubmit;
