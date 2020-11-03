import React, { useState, useEffect } from 'react';
import CreatePetition from './CreatePetition';
import PetitionUpdate from './PetitionUpdate';

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
        URL={URL}
      />
      <CreatePetition
        history={history}
        headers={headers}
        petitions={petitions}
        setPetitions={setPetitions}
        URL={URL}
      />
    </div>
  )
}

export default Admin;
