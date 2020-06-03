import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignatureDisplay = () => {
  const [signatures, setSignatures] = useState([]);


  useEffect(() => {
    axios.get('/api/signature/trump lies')
      .then(response => setSignatures(response.data))
      .catch(error => console.log(error));
  }, [])

  return (
    <div id="signature-display-view">
      <ul>
        {console.log(signatures)}
        {signatures.map(record => {
          return (
            <li key={record._id}>{record.name} {record.state}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default SignatureDisplay;
