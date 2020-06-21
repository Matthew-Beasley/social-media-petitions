import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (credentials) => {
    const token = (await axios.post('/user/token', credentials)).data;
    window.localStorage.setItem('token', token);
    const usr = (await axios.get(`/user/${token}`)).data;
    setUser(usr);
  };

  const URLizeEmail = (mail) => {
    mail = mail.replace(/\./gi, '%2E');
    mail = mail.replace(/@/gi, '%40');
    return mail;
  }

  const checkCredentials = async (event) => {
    event.preventDefault();
    const mail = URLizeEmail(email);
    const user = (await axios.get(`/user/email/${mail}`)).data;
    if (!user) {
      await axios.post('/user', { email, password });
      login({ email, password });
    } else {
      login({ email, password });
    }
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }

  return (
    <div id="login">
      <form id="login" onSubmit={(ev) => checkCredentials(ev)}>
        <input type="email" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input type="submit" value="Submit" />
        <input type="button" value="logout" onClick={() => logout()} />
      </form>
    </div>
  )
}

export default Login;
