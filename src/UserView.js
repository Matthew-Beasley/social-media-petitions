import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';

const UserView = ({ history, user, headers, setTrigger, startTime, endTime }) => {
  const [signatures, setSignatures] = useState([]);
  //to do: solve reload problaem, maybe get user again if he doesn't exist?
  
  return (
    <div>
      <UserPetitionDisplay
        user={user}
        headers={headers}
        signatures={signatures}
        setSignatures={setSignatures}
        setTrigger={setTrigger}
        startTime={startTime}
        endTime={endTime}
        URL={URL}
      />
      <MySignedPetitions
        user={user}
        headers={headers}
        signatures={signatures}
        setTrigger={setTrigger}
        URL={URL}
      />
    </div>
  )
}

export default UserView;

