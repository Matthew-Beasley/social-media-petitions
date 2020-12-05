import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, triggerState } from './State';
import CreatePetition from './CreatePetition';
import PetitionUpdate from './PetitionUpdate';
import SuggestionAdmin from './SuggestionAdmin';

const Admin = ({ headers }) => {
  const [petitions, setPetitions] = useState([]);
  const [trigger, setTrigger] = useRecoilState(triggerState);

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
