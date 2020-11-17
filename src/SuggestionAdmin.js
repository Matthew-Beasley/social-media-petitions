import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SuggestionAdmin = ({ headers, setPetitions, petitions }) => {
  const [views, setViews] = useState([]);
  useEffect(() => {
    axios.get('/suggestion', headers())
      .then(rows => setViews(rows.data))
  }, [])

  const promote = async (suggestion) => {
    const petition = {
      topic: suggestion.topic,
      shortText: suggestion.shortText,
      longText: suggestion.longText,
      surrent: false
    }
    await axios.delete(`/suggestion?topic=${suggestion.topic}`, headers());
    setPetitions(...petitions, petition);
    //get rid of suggestion from views
  }

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
              <button type="button" onClick={() => promote(item)}>Promote to Petition</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SuggestionAdmin;
