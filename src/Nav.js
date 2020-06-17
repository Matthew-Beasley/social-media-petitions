import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Nav = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkCredentials = async (event) => {
    event.preventDefault();
    
  }

  return (
    <div id="nav">
      <form id="login" onSubmit={(ev) => checkCredentials(ev)}>
        <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="text" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Nav;
