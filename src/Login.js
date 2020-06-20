import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (credentials) => {
    const token = (await axios.post('/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    //exchangeTokenForAuth();
  };

  const URLizeEmail = (mail) => {
    mail = mail.replace(/\./gi, '%2E');
    mail = mail.replace(/@/gi, '%40');
    return mail;
  }

  const checkCredentials = async (event) => {
    event.preventDefault();
    const mail = URLizeEmail(email);
    const user = await axios.get(`/user/${mail}`).data;
    //console.log('user in login', user)
    if (!user) {
      //console.log('in login', email, password)
      await axios.post('/user', { email, password });
    } else {
      login({ email, password });
    }
  }

  return (
    <div id="login">
      <form id="login" onSubmit={(ev) => checkCredentials(ev)}>
        <input type="email" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login;
