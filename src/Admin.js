import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';
const {
  headers
} = require('./testAuthorization');

const Admin = () => {
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
      <form id="create-petition">
        <input type="text" placeholder="Topic" onChange={ev => setTopic(ev.target.value)} />
        <input type="text" placeholder="Short Text" onChange={ev => setShortText(ev.target.value)} />
        <input type="text" placeholder="LongText" onChange={ev => setLongText(ev.target.value)} />
        <input type="checkbox" onChange={ev => setCurrent(ev.target.value)} />
        <label>This is a current topic</label>
        <input type="button" onSubmit={ev => createPetition(ev)} />
      </form>
    </div>
  )
}