import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';

const UserView = ({ history, user, headers, setTrigger }) => {
  const [signatures, setSignatures] = useState([]);
  return (
    <div>
      <UserPetitionDisplay
        user={user}
        headers={headers}
        signatures={signatures}
        setSignatures={setSignatures}
        setTrigger={setTrigger}
      />
      <MySignedPetitions
        user={user}
        headers={headers}
        signatures={signatures}
        setTrigger={setTrigger}
      />
    </div>
  )
}

export default UserView;

