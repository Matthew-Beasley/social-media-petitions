import React, {useState, useEffect} from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';
import Nav from './Nav';

const App = () => {
  const [user, setUser] = useState({});
  return (
    <div id="app-constainer">
      <h1>{user.id}</h1>
      <Nav setUser={setUser} />
      <PetitionDisplay />
      <SignatureDisplay />
    </div>
  )
}

export default App;
