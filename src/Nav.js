import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './State';
import Login from './Login';

const Nav = ({ trigger, history }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const [user, setUser] = useRecoilState(userState);


  useEffect(() => {
    forceUpdate();
  }, [trigger]);

  return (
    <div id="nav">
      <div id="links">
        {history.location.pathname !== '/' ? <Link className="nav-link" id="home-link" to="/">Home</Link> : null}
        {!!user.isAdmin && <Link className="nav-link" to="/Admin">Administration</Link>}
        {user.email && history.location.pathname !== '/UserView' ? <Link className="nav-link" id="mypage-link" to="/UserView">My Page</Link> : null}
      </div>
      <Login setUser={setUser} history={history} />
    </div>
  )
}

export default Nav;
