import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isUser, setIsUser] = useState(true);

  const login = async (credentials) => {
    const token = (await axios.post('/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };

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
    <div id="login">
      <form id="login" onSubmit={(ev) => checkCredentials(ev)}>
        <input type="email" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <input type="text" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      {!isUser &&
        <form>
          <input type="text" placeholder="first name" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} />
          <input type="text" placeholder="last name" value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
          <input type="text" placeholder="street" value={street} onChange={(ev) => setStreet(ev.target.value)} />
          <input type="text" placeholder="city" value={city} onChange={(ev) => setCity(ev.target.value)} />
          <input type="text" placeholder="state" value={state} onChange={(ev) => setState(ev.target.value)} />
          <input type="text" placeholder="zipcode" value={zipcode} onChange={(ev) => setZipcode(ev.target.value)} />
        </form>}
    </div>
  )
}