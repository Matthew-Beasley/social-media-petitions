import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import PetitionUpdate from './PetitionUpdate';
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const Admin = ({ headers, history }) => {
  const [topic, setTopic] = useState('');
  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [current, setCurrent] = useState(false);

  const createPetition = async (ev) => {
    ev.preventDefault();
    //topic, shortText, longText, current
    const petition = await axios.post(url + '/petition',
      { topic, shortText, longText, current },
      headers());
  }

  return (
    <div id="admin-container">
      <PetitionUpdate history={history} headers={headers} />
      <form id="create-petition">
        <input
          type="text" id="admin-topic-input" placeholder="Topic"
          value={topic} onChange={ev => setTopic(ev.target.value)}
        />
        <input
          type="text" id="admin-shorttext-input" placeholder="Short Text"
          value={shortText} onChange={ev => setShortText(ev.target.value)}
        />
        <input
          type="text" id="admin-longtext-input" placeholder="LongText"
          value={longText} onChange={ev => setLongText(ev.target.value)}
        />
        <input
          type="checkbox" id="admin-current-checkbox"
          value={current} onChange={ev => setCurrent(ev.target.value)} />
        <label>This is a current topic</label>
        <input type="button" id="admin-topic-button" onSubmit={ev => createPetition(ev)} />
      </form>
    </div>
  )
}

export default Admin;
