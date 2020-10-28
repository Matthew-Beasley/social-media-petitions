import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';

const UserView = ({ history, user, headers }) => {
  const [signatures, setSignatures] = useState([]);
  return (
    <div>
      <UserPetitionDisplay
        user={user}
        headers={headers}
        signatures={signatures}
        setSignatures={setSignatures}
      />
      <MySignedPetitions
        user={user}
        headers={headers}
        signatures={signatures}
      />
    </div>
  )
}

export default UserView;
