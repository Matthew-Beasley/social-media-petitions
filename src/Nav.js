import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Nav = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setIsUser] = useState(true);

  const URLizeEmail = (mail) => {
    mail = mail.replace(/\./gi, '%2E');
    mail = mail.replace(/@/gi, '%40');
    return mail;
  }

  const checkCredentials = async (event) => {
    event.preventDefault();
    const mail = URLizeEmail(email);
    const user = await axios.get(`/user/${mail}`);
    if (!user) {
      setIsUser(false);
    } else {
      //do login stuff 
    }
  }

  return (
    <div id="nav">
      <form id="login" onSubmit={(ev) => checkCredentials(ev)}>
        <input type="email" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Nav;
