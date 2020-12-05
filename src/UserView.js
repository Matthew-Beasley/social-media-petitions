import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isDroppedState, signaturesState } from './State';
import UserPetitionDisplay from './UserPetitionDisplay';
import MySignedPetitions from './MySignedPetitions';
import UserSuggestionSubmit from './UserSuggestionSubmit';

const UserView = ({ headers }) => {
  const [signatures, setSignatures] = useRecoilState(signaturesState);
  const [isDropped, setIsDropped] = useRecoilState(isDroppedState);
  //to do: solve reload problem, maybe get user again if he doesn't exist?

  return (
    <div>
      <UserSuggestionSubmit headers={headers} />
      {!isDropped &&
        <div>
          <UserPetitionDisplay headers={headers} />
          <MySignedPetitions headers={headers} />
        </div>
      }
    </div>
  )
}

export default UserView;

