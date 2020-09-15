import React, {useState, useEffect} from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
import News from './News';

const App = () => {
  const [user, setUser] = useState({});
  return (
    <div id="app-constainer">
      <Header />
      <Nav user={user} setUser={setUser} />
      <Route exact path="/" render={() => <HomeView />} />
      <Route path="/news" render={() => <News />} />
      <Route path="/petition" render={() => <PetitionDisplay />} />
      <Route path="signature" render={() => <SignatureDisplay />} />
    </div>
  )
}

export default App;
