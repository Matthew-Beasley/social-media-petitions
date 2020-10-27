import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const UserPetitionDisplay = ({ user, headers }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const url = 'http://localhost:3000';
  const [unsignedPetitions, setUnsignedPetitions] = useState([]);
  const [petitions, setPetitions] = useState([]);
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    axios.get('/petition/current')
      .then((response) => {
        setPetitions(response.data);
      });
  }, []);

  useEffect(() => {
    //fix user and email for this
    axios.get(`${url}/signature/byemail?email=conbec@outlook.com`, headers())
      .then(response => {
        const unsigned = [];
        if (response.data.length === 0) {
          unsigned.push(petitions)
        } else if (petitions.length !== 0) {
          for (let i = 0; i < petitions.length; i++) {
            let match = false;
            for (let k = 0; k < response.data.length; k++) {
              if (petitions[i].topic === response.data[k].topic) {
                match = true;
              }
            }
            if (match === false) {
              console.log('push(petitions[i]', petitions[i])
              unsigned.push(petitions[i]);
            }
          }
        }
        setUnsignedPetitions(...unsigned);
      }
    )
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
    const response = await axios.post(url + '/signature', { email: 'conbec@outlook.com', topic: petitionToSign.topic }, headers());
    setSignatures([...signatures, response.data]);
  }

  return (
    <div id="user-petition-container">
      <ul id="user-petition-list">
        {console.log('unsignedPetitions in return', unsignedPetitions)}
        {unsignedPetitions.map(petition => {
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
              {!!petition.news &&
                <div id="petition-newsitem">
                  <img className="news-image" src={petition.news.urlToImage ? petition.news.urlToImage : './assets/default-article-image.jpg'} />
                  <div className="news-content">
                    <div className="news-title"><a href={petition.news.url} target="_blank" rel="noopener noreferrer">{petition.news.title}</a></div>
                    <div className="news-description">{petition.news.description}</div>
                  </div>
                </div>
              }
            </li>
          )})}
      </ul>
      <hr id="user-petitiondisplay-hr" />
    </div>
  )
}

export default UserPetitionDisplay;
