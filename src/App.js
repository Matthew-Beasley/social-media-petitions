import React from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';

const App = () => {

  return (
    <div id="app-constainer">
      <h3>in App</h3>
      <SignatureDisplay />
    </div>
  )
}

export default App;
