import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };

  return (
    <div id="login">
      <form id="login-form" onSubmit>

      </form>

    </div>
  )
}