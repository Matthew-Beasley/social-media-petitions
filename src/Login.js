import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({ setUser, history }) => {
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
    if (!user.email) {
      await axios.post('/user', { email, password });
      await login({ email, password });
    } else {
      await login({ email, password });
    }
    setEmail('');
    setPassword('');
    history.push('/UserView');
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
    history.push('/')
  }

  return (
    <div id="login">
      <form id="login-form" onSubmit={(ev) => checkCredentials(ev)}>
        <div id="login-text">
          <p>To log in or create an account enter email and password</p>
        </div>
        <input id="email" type="email" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input id="password" type="text" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input id="submit" type="submit" value="Submit" />
        <input id="logout" type="button" value="logout" onClick={() => logout()} />
      </form>
    </div>
  )
}

export default Login;
