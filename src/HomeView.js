import React, { useEffect, useState } from 'react';
import News from './News';
import PetitionDisplay from './PetitionDisplay';

const HomeView = () => {

  return (
    <div id="home-view">
      <PetitionDisplay />
      <News />
    </div>
  )
}

export default HomeView;
