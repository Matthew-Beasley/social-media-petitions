import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './Login';

const Nav = ({ user, setUser, history }) => {

  return (
    <div id="nav">
      <div id="links">
        {!!user.isAdmin && <Link id="admin-link" to="/Admin">Administration</Link>}
        {history.location.pathname !== '/' ? <Link id="home-link" to="/UserView">Home</Link> : null}
      </div>
      <Login setUser={setUser} history={history} />
    </div>
  )
}

export default Nav;
