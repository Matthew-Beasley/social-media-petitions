import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignatureDisplay = () => {
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    axios.get('/signature')
      .then(response => setSignatures(response.data))
      .catch(error => console.log(error));
  }, [])

  return (
    <div id="signature-display-view">
      <ul>
        {signatures.map(record => {
          return (
            <li key={record.id}>{record.topic} {record.userId}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default SignatureDisplay;
