import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UserSuggestionsView = ({ headers, suggestions, user }) => {
  const [views, setViews] = useState([]);
  useEffect(() => {
    axios.get(`/suggestion/byemail?email=${user.email}`, headers())
    .then(rows => setViews(rows.data))
  }, [suggestions])

  return (
    <div id="user-suggestion-container">
      <div id="user-suggestion-header">Suggestions I have submitted</div>
      <ul>
        {views.map(item => {
          return (
            <li key={uuidv4()} >
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
