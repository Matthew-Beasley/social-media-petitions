import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetitionUpdate = ({ history, headers }) => {
  const [topics, setTopics] = useState([]);
  const url = 'http://localhost:3000';

  useEffect(() => {
    let isCancelled = false;
    axios.get('/petition/current')
      .then((response) => {
        if (!isCancelled) {
          setTopics(response.data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div id="petition-display-container">
      <ul id="user-petition-list">
        {topics.map(topic => {

          let isChecked;
          const setCheck = () => {
            if (isChecked) {
              isChecked = false;
            } else {
              isChecked = true;
            }
          }

          const updatePetition = async () => {
            const response = await axios.put(url + '/petition',
              {
                topic: topic.topic,
                shortText: topic.shortText,
                longText: topic.longText,
                current: topic.current
              },
              headers());
            return response;
          }

          const setText = (textVal, ev) => {
            if (textVal === 'shortText') {
              topic.shortText = ev.target.value;
            } else if (textVal === 'longText') {
              topic.longText = ev.target.value
            }
          }

          return (
            <li key={topic.id} className="user-petition-li">
              <div className="petition-topic">{topic.topic}</div>
              <div>
                <textarea
                  className="input-shorttext"
                  spellCheck="true"
                  defaultValue={topic.shortText}
                  onChange={(ev) => { setText('shortText', ev) }}
                  rows="3"
                />
              </div>
              <div>
                <textarea
                  className="input-longtext"
                  spellCheck="true"
                  defaultValue={topic.longText}
                  onChange={(ev) => { setText('longText', ev); console.log(topic.longText) }}
                  rows="10"
                />
              </div>
              <div>
                <label>
                  <input
                    className="iscurrent"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => { setCheck(); console.log(isChecked) }}
                  />Is current petition
                </label>
                <button
                  className="update-bttn"
                  type="button"
                  onClick={() => { updatePetition(topic); console.log(topic) }}>
                  Update Petition
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PetitionUpdate;
