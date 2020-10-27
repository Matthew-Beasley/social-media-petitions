import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const MySignedPetitions = ({ user, headers }) => {
  const [signedPetitions, setSignedPetitions] = useState([]);
  const url = 'http://localhost:3000';
  
  useEffect(() => {
    let isCancelled = false;
    console.log(user)
    //fix user.email here
    axios.get(`${url}/signature/byemail?email=conbec@outlook.com`, headers())
      .then((response) => {
        if (!isCancelled) {
          setSignedPetitions(response.data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div id="signed-petition-container">
      <h3>in MySignedPetitions</h3>
      <ul>
        {signedPetitions.map(petition => {
          return (
            <li key={petition.id} className="user-petition-li">
              <div className="user-petition-content">
                <div>id is {petition.id}</div>
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
