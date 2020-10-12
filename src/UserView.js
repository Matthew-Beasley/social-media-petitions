import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import UserPetitionDisplay from './UserPetitionDisplay';

const UserView = ({ history }) => {
  return (
    <div>
      <UserPetitionDisplay />
    </div>
  )
}

export default UserView;
