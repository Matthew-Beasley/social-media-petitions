import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, triggerState, startTimeState, endTimeState, signaturesState } from './State';
import axios from 'axios';

const UserPetitionDisplay = ({ headers }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const [user, setUser] = useRecoilState(userState);
  const [trigger, setTrigger] = useRecoilState(triggerState);
  const [startDate, setStartDate] = useRecoilState(startTimeState);
  const [endDate, setEndDate] = useRecoilState(endTimeState);
  const [signatures, setSignatures] = useRecoilState(signaturesState);
  const [petitions, setPetitions] = useState([]);
  const [unsignedPetitions, setUnsignedPetitions] = useState();

  useEffect(() => {
    axios.get(`/petition/unsigned?email=${user.email}`)
      .then((response) => {
        setPetitions(response.data);
      });
  }, [signatures]);

  useEffect(() => {
    setTrigger(Math.random());
  }, []);

  useEffect(() => {
    axios.get(`/signature/byemail?email=${user.email}`, headers())
      .then(response => {
        const unsigned = [];
        if (response.data.length === 0) {
          unsigned.push(...petitions)
        } else if (petitions.length !== 0) {
          for (let i = 0; i < petitions.length; i++) {
            let match = false;
            for (let k = 0; k < response.data.length; k++) {
              if (petitions[i].topic === response.data[k].topic) {
                match = true;
              }
            }
            if (match === false) {
              unsigned.push(petitions[i]);
            }
          }
        }
        setUnsignedPetitions(unsigned);
      })
  }, [petitions])

  useEffect(() => {
    petitions.forEach(petition => {
      axios.get(`/news/everything?q=${petition.topic}&from=${startDate}&to${endDate}`)
        .then(response => {
          petition.news = response.data.articles[0];
          forceUpdate();
        })
    });
  }, [petitions]);

  const signPetition = async (petitionToSign) => {
    const response = await axios.post('/signature', { email: user.email, topic: petitionToSign.topic }, headers());
    setSignatures([...signatures, response.data]);
  }

  return (
    <div id="user-petition-container">
      <h1 className="user-h1">Unsigned Petitions</h1>
      <ul id="user-petition-list">
        {!!unsignedPetitions && unsignedPetitions.map(petition => {
          return (
            <li key={petition.topic} className="user-petition-li">
              <div className="user-petition-content">
                <div className="petition-topic">{petition.topic}</div>
                <div className="petition-shorttext">{petition.shortText}</div>
                <div className="petition-longtext">{petition.longText}</div>
                <button
                  className="update-bttn"
                  type="button"
                  onClick={() => signPetition(petition)}>
                  Sign Petition
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <hr id="user-petitiondisplay-hr" />
    </div>
  )
}

export default UserPetitionDisplay;
