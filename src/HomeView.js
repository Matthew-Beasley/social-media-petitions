import React, { useEffect, useState } from 'react';
import News from './News';
import PetitionDisplay from './PetitionDisplay';

const HomeView = () => {
  const [petitions, setPetitions] = useState([]);

  return (
    <div id="home-view">
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
