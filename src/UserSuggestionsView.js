import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSuggestionsView = ({ headers, suggestions, setSuggestions }) => {
  useEffect(() => {
    axios.get('/suggestion', headers())
    .then(rows => setSuggestions(rows.data))
  }, [suggestions])

  return (
    <div id="user-suggestion-container">
      <ul>
        {suggestions.map(item => {
          return (
            <li key = { item.id } > { item.topic }</li>
        )})}
      </ul>
    </div>
  )
}

export default UserSuggestionsView;
