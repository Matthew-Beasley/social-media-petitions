import React from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';

const App = () => {

  return (
    <div id="app-constainer">
      <PetitionDisplay />
      <SignatureDisplay />
    </div>
  )
}

export default App;
