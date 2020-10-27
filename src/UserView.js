import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';

const UserView = ({ history, user, headers }) => {
  return (
    <div>
      <UserPetitionDisplay
        user={user}
        headers={headers}
      />
      <MySignedPetitions
        user={user}
        headers={headers}
      />
    </div>
  )
}

export default UserView;
