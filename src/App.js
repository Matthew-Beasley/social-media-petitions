import React, {useState, useEffect} from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, triggerState, startTimeState, endTimeState } from './State';
import dayjs from 'dayjs';
import Admin from './Admin';
import Header from './Header';
import Nav from './Nav';
import HomeView from './HomeView';
import UserView from './UserView';

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useState('');
  const [trigger, setTrigger] = useRecoilState(triggerState);
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);
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
  }, []);

  return (
    <div id="app-container">
      <Header />
      <Nav history={history} />
      <Route exact path="/" render={() => <HomeView />} />
      <Route path="/UserView" render={() => <UserView headers={headers} />} />
      <Route path="/Admin" render={() => <Admin headers={headers} />} />
    </div>
  )
}

export default App;
