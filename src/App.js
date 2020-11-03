import React, {useState, useEffect} from 'react';
import { Route, Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs';
import Admin from './Admin';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
import UserView from './UserView';

const App = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [trigger, setTrigger] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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

  useEffect(() => {
    let now = dayjs();
    setEndTime(now.format('YYYY-MM-DD'));
    setStartTime(now.subtract('3', 'day').format('YYYY-MM-DD'));
  }, [/*trigger*/]);

  return (
    <div id="app-container">
      <Header />
      <Nav user={user} setUser={setUser} history={history} trigger={trigger} />
      <Route
        exact path="/" render={() =>
          (<HomeView
            setTrigger={setTrigger}
            startTime={startTime}
            endTime={endTime}
          />)}
      />
      <Route
        path="/UserView" render={() =>
        (<UserView
          history={history}
          user={user}
          headers={headers}
          trigger={trigger}
          setTrigger={setTrigger}
          startTime={startTime}
          endTime={endTime}
        />)}
      />
      <Route
        path="/Admin" render={() =>
        (<Admin
          history={history}
          headers={headers}
          setTrigger={setTrigger}
        />)}
      />
    </div>
  )
}

export default App;
