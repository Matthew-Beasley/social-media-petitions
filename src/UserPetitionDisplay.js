import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const UserPetitionDisplay = ({ user, headers, signatures, setSignatures }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const url = 'http://localhost:3000';
  const [petitions, setPetitions] = useState([]);
  const [unsignedPetitions, setUnsignedPetitions] = useState();

  useEffect(() => {
    axios.get('/petition/current')
      .then((response) => {
        setPetitions(response.data);
      });
  }, [signatures]);

  useEffect(() => {
    axios.get(`${url}/signature/byemail?email=${user.email}`, headers())
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
      axios.get(`/news/everything?q=${petition.topic}`)
        .then(response => {
          petition.news = response.data.articles[0];
          forceUpdate();
        })
    });
  }, [petitions]);

  const signPetition = async (petitionToSign) => {
    const response = await axios.post(url + '/signature', { email: user.email, topic: petitionToSign.topic }, headers());
    setSignatures([...signatures, response.data]);
  }

  return (
    <div id="user-petition-container">
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
                {!!petition.news &&
                  <div id="petition-newsitem">
                    <img className="news-image" src={petition.news.urlToImage ? petition.news.urlToImage : './assets/default-article-image.jpg'} />
                    <div className="news-content">
                      <div className="news-title"><a href={petition.news.url} target="_blank" rel="noopener noreferrer">{petition.news.title}</a></div>
                    </div>
                  </div>
                }
              </div>
            </li>
          )})}
      </ul>
      <hr id="user-petitiondisplay-hr" />
    </div>
  )
}

export default UserPetitionDisplay;
