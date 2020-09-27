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
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(window.localStorage.getItem('token'));
  }, [user]);
  if (!token) {
    return (
      <div id="app-container">
        <Header />
        <Nav user={user} setUser={setUser} />
        <PetitionDisplay />
        <News />
      </div>
    )
  } else {
    return (
      <div id="loggedin-container">
        <Header />
        <Nav user={user} setUser={setUser} />
        <Route exact path="/" render={() => <HomeView />} />
        <Route path="/petition" render={() => <PetitionDisplay />} />
        <Route path="/signature" render={() => <SignatureDisplay />} />
      </div>
    )
  }
}

export default App;
