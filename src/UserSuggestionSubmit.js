import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState, isDroppedState, suggestionsState } from './State';
import axios from 'axios';
import UserSuggestionsView from './UserSuggestionsView';


const UserSuggestionSubmit = ({ headers }) => {
  const [user, setUser] = useRecoilState(userState)
  const [isDropped, setIsDropped] = useRecoilState(isDroppedState);
  const [suggestions, setSuggestions] = useRecoilState(suggestionsState);
  const [topic, setTopic] = useState('');
  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [createSuccessful, setCreateSuccessful] = useState(false);

  const submitPetition = async () => {
    const suggestionResponse = await axios.post('/suggestion', //change this to the new user petition table route
      { topic, shortText, longText, email: user.email },
      headers());
    if (suggestionResponse.data.topic === topic) {
      setCreateSuccessful(true);
    }
    setSuggestions([...suggestions, suggestionResponse.data]);
    setTopic('');
    setShortText('');
    setLongText('');
  }

  const setDropDown = () => {
    if (isDropped === true) {
      setIsDropped(false);
    } else {
      setIsDropped(true);
    }
  }

  return (
    <div id="user-submit-container">
      <div id="user-submit-launch">
        {isDropped ?
        <div
          id="dropdown-link"
          onClick={() => setDropDown()}>
          Click to Close User Submission Form
        </div>
        :
        <div
          id="dropdown-link"
          onClick={() => setDropDown()}>
          Click to Open User Submission Form to submit a petition suggestion
        </div>}
      </div>
      {isDropped &&
      <div>
        <div id="user-form-header">
          <p>
            To submit a suggestion for a petition, fill out the form below.<br />
            Suggestions are ranked by frequency of appearance, and most popular petitions will be set as current.
          </p>
        </div>
        <form id="user-petition-form">
          {createSuccessful && <h3>Successfully created petition suggestion {topic}</h3>}
          <input
            type="text" id="admin-topic-input"
            placeholder="Topic"
            value={topic} onChange={ev => { setTopic(ev.target.value); setCreateSuccessful(false) }}
          />
          <textarea
            id="create-input-shorttext"
            spellCheck="true"
            placeholder="Short Text"
            defaultValue={topic.shortText}
            onChange={ev => { setShortText(ev.target.value); setCreateSuccessful(false) }}
            rows="3"
          />
          <textarea
            id="create-input-longtext"
            spellCheck="true"
            placeholder="Long Text"
            defaultValue={topic.longText}
            onChange={ev => { setLongText(ev.target.value); setCreateSuccessful(false) }}
            rows="10"
          />
          <button
            type="button"
            id="admin-create-button"
            onClick={() => submitPetition()} >
            Create Suggestion
          </button>
        </form>
        <UserSuggestionsView
          headers={headers}
          suggestions={suggestions}
        />
      </div>}
    </div>
  )
}

export default UserSuggestionSubmit;
