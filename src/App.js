import React, {useState, useEffect} from 'react';
import {Route, Link} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
//checkin comment

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
        <HomeView />
      </div>
    )
  } else {
    return (
      <div id="app-container">
        <Header />
        <Nav user={user} setUser={setUser} />
        <HomeView />
      </div>
    )
  }
}

export default App;
