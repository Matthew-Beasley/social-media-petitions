import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import CreatePetition from './CreatePetition';
import PetitionUpdate from './PetitionUpdate';
const axios = require('axios');
process.env.JWT = 'foobar';
const url = 'http://localhost:3000';

const Admin = ({ headers, history, setTrigger }) => {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    setTrigger(Math.random());
  }, []);
  
  return (
    <div id="admin-container">
      <PetitionUpdate
        headers={headers}
        petitions={petitions}
        setPetitions={setPetitions}
      />
      <CreatePetition
        history={history}
        headers={headers}
        petitions={petitions}
        setPetitions={setPetitions}
      />
    </div>
  )
}

export default Admin;
