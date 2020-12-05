import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState, triggerState, signaturesState } from './State';
import axios from 'axios';

const MySignedPetitions = ({ headers }) => {
  const [signedPetitions, setSignedPetitions] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  const [trigger, setTrigger] = useRecoilState(triggerState);
  const [signatures, setSignatures] = useRecoilState(signaturesState);

  useEffect(() => {
    let isCancelled = false;
    axios.get(`/signature/byemail?email=${user.email}`, headers())
      .then((response) => {
        if (!isCancelled) {
          setSignedPetitions(response.data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [signatures]);

  useEffect(() => {
    setTrigger(Math.random());
  }, []);

  return (
    <div id="signed-petition-container">
      <h1 className="user-h1">Signed Petitions</h1>
      <ul>
        {signedPetitions.map(petition => {
          return (
            <li key={petition.id} className="user-petition-li">
              <div className="user-petition-content">
                <div className="petition-thanks">Thank you for your Support!</div>
                <div className="petition-topic">{petition.topic}</div>
                <div className="petition-shorttext">{petition.shortText}</div>
                <div className="petition-longtext">{petition.longText}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MySignedPetitions;

