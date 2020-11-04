import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';
import UserPetitionSubmit from './UserPetitionSubmit';

const UserView = ({ history, user, headers, setTrigger, startTime, endTime }) => {
  const [signatures, setSignatures] = useState([]);
  const [isDropped, setIsDropped] = useState(false);
  //to do: solve reload problem, maybe get user again if he doesn't exist?

  return (
    <div>
      <UserPetitionSubmit
        history={history}
        headers={headers}
        isDropped={isDropped}
        setIsDropped={setIsDropped}
      />
      {!isDropped &&
        <div>
          <UserPetitionDisplay
            user={user}
            headers={headers}
            signatures={signatures}
            setSignatures={setSignatures}
            setTrigger={setTrigger}
            startTime={startTime}
            endTime={endTime}
          />
          <MySignedPetitions
            user={user}
            headers={headers}
            signatures={signatures}
            setTrigger={setTrigger}
          />
        </div>
      }
    </div>
  )
}

export default UserView;

