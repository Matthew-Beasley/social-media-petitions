import React, { useState, useEffect } from 'react';
import Login from './Login';

const Nav = ({ user, setUser }) => {

  return (
    <div id="nav">
      <Login setUser={setUser} />
    </div>
  )
}

export default Nav;
