import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';

const Header = () => {

  return (
    <div id="header">
      <div id="header-left">
        <p>Your Voice</p>
      </div>
      <img src="../assets/header-flag.jpg" />
    </div>
  )
}

export default  Header;
