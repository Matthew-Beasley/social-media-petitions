import React, { useEffect, useState } from 'react';
import PetitionDisplay from './PetitionDisplay';

const HomeView = () => {

  return (
    <div id="home-view">
      <PetitionDisplay />
      <div id="news-feed">
        <h1>News feed goes here</h1>
      </div>
    </div>
  )
}

export default HomeView;
