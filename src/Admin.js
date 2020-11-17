import React, { useState, useEffect } from 'react';
import CreatePetition from './CreatePetition';
import PetitionUpdate from './PetitionUpdate';
import SuggestionAdmin from './SuggestionAdmin';

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
      <SuggestionAdmin
        headers={headers}
        petitions={petitions}
        setPetitions={setPetitions}
      />
    </div>
  )
}

export default Admin;
