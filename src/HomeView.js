import React, { useState } from 'react';
import News from './News';
import PetitionDisplay from './PetitionDisplay';

const HomeView = () => {
  const [petitions, setPetitions] = useState([]);

  return (
    <div id="home-view">
      <div>
        <h1>Something here</h1>
        <p>more descriptive text</p>
      </div>
      <PetitionDisplay
        petitions={petitions}
        setPetitions={setPetitions}
      />
      <News
        petitions={petitions}
        setPetitions={setPetitions}
      />
    </div>
  )
}

export default HomeView;
