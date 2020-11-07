import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSuggestionsView = ({ headers, suggestions, setSuggestions }) => {
  useEffect(() => {
    axios.get('/suggestion', headers())
    .then(rows => setSuggestions(rows.data))
  }, [suggestions])

  return (
    <div id="user-suggestion-container">
      <div id="user-suggestion-header">Suggestions I have submitted</div>
      <ul>
        {suggestions.map(item => {
          return (
            <li key={item.id} >
              <div className="user-suggestion-topic">{item.topic}</div>
              <div>{item.shortText}</div>
              <div>{item.longText}</div>
            </li>
        )})}
      </ul>
    </div>
  )
}

export default UserSuggestionsView;
