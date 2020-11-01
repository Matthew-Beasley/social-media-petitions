import React, {useState, useEffect} from 'react';
import { Route, Link, useHistory} from 'react-router-dom'
import Admin from './Admin';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
import UserView from './UserView';

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [trigger, setTrigger] = useState(0);
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

  return (
    <div id="app-container">
      <Header />
      <Nav user={user} setUser={setUser} history={history} trigger={trigger} />
      <Route exact path="/" render={() => <HomeView setTrigger={setTrigger} />} />
      <Route path="/UserView" render={() => <UserView history={history} user={user} headers={headers} setTrigger={setTrigger} />} />
      <Route path="/Admin" render={() => <Admin history={history} headers={headers} setTrigger={setTrigger} />} />
    </div>
  )
}

export default App;
