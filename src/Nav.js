import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './Login';

const Nav = ({ user, setUser, history }) => {

  return (
    <div id="nav">
      {!!user.isAdmin && <Link id="admin-link" to="/Admin">Administration</Link>}
      {!!user.isAdmin && history.location.pathname !== '/' ? <Link id="home-link" to="/UserView">Home</Link> : null}
      {console.log(history.location.pathname)}
      <Login setUser={setUser} history={history} />
    </div>
  )
}

export default Nav;
