import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PetitionUpdate = ({ petitions, setPetitions, headers }) => {

  useEffect(() => {
    axios.get('/petition')
      .then((response) => {
        setPetitions(response.data);
      });
  }, []);

  return (
    <div id="petition-display-container">
      <ul id="user-petition-list">
        {petitions.map(topic => {
          let isChecked;
          const setCheck = () => {
            if (isChecked) {
              isChecked = false;
            } else {
              isChecked = true;
            }
            topic.current = isChecked;
          }

          const updatePetition = async () => {
            const response = await axios.put('/petition',
              {
                topic: topic.topic,
                shortText: topic.shortText,
                longText: topic.longText,
                current: topic.current
              },
              headers());
            return response;
          }

          const deletePetition = async () => {
            await axios.delete(`/petition?topic=${topic.topic}`, headers());
            const index = petitions.indexOf(topic.topic);
            petitions.splice(index, 1);
            setPetitions([...petitions]);
         }

          const setText = (textVal, ev) => {
            if (textVal === 'shortText') {
              topic.shortText = ev.target.value;
            } else if (textVal === 'longText') {
              topic.longText = ev.target.value
            }
          }

          return (
            <li key={uuidv4()} className="user-petition-li">
              <div className="petition-topic">{topic.topic}</div>
              <div>
                <textarea
                  className="update-input-shorttext"
                  spellCheck="true"
                  defaultValue={topic.shortText}
                  onChange={(ev) => { setText('shortText', ev) }}
                  rows="3"
                />
              </div>
              <div>
                <textarea
                  className="update-input-longtext"
                  spellCheck="true"
                  defaultValue={topic.longText}
                  onChange={(ev) => setText('longText', ev)}
                  rows="10"
                />
              </div>
              <div>
                <label>
                  <input
                    className="iscurrent"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setCheck()}
                  />Is current petition
                </label>
                <button
                  className="update-bttn"
                  type="button"
                  onClick={() => updatePetition(topic)}>
                  Update Petition
                </button>
                <button
                  className="delete-bttn"
                  type="button"
                  onClick={() => deletePetition()}>
                  Delete Petition
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
