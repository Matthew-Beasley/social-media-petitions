import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './Login';

const Nav = ({ user, setUser, history }) => {
  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
    history.push('/')
  }

  return (
    <div id="nav">
      <div id="links">
        {console.log(user)}
        {history.location.pathname !== '/' && <Link className="nav-link" to="/">Home</Link>}
        {!!user.isAdmin && <Link className="nav-link" to="/Admin">Administration</Link>}
        {!!user.email && history.location.pathname !== '/UserView' ? <Link className="nav-link" to="/UserView">My Page</Link> : null}
      </div>
      <Login setUser={setUser} history={history} />
    </div>
  )
}

export default Nav;
