import React, {useState, useEffect} from 'react';
import { Route, Link, useHistory} from 'react-router-dom'
import SignatureDisplay from './SignatureDisplay';
import PetitionDisplay from './PetitionDisplay';
import Admin from './Admin';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
import UserView from './UserView';

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const history = useHistory();
  const headers = () => {
    return {
      headers: {
        authorization: token
      }
    };
  };
  useEffect(() => {
    setToken(window.localStorage.getItem('token'));
  }, [user]);
  if (!token) {
    return (
      <div id="app-container">
        <Header />
        <Nav user={user} setUser={setUser} history={history} />
        <Route exact path="/" component={ HomeView } />
      </div>
    )
  } else {
    return (
      <div id="app-container">
        <Header />
        <Nav user={user} setUser={setUser} history={history} />
        <Route path="/UserView" render={() => <UserView history={history} />} />
        <Route path="/Admin" component={ Admin } />
      </div>
    )
  }
}

export default App;
