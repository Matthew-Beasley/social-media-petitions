import React from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';
import Nav from './Nav';

const App = () => {

  return (
    <div id="app-constainer">
      <Nav />
      <PetitionDisplay />
      <SignatureDisplay />
    </div>
  )
}

export default App;
