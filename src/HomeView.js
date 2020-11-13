import React, { useEffect, useState } from 'react';
import News from './News';
import PetitionDisplay from './PetitionDisplay';

const HomeView = ({ trigger, setTrigger, startTime, endTime }) => {
  const [petitions, setPetitions] = useState([]);

  return (
    <div id="home-view">
      <div id="home-text">
        <p>
          Welcome to Our Voice! This is a place to express your support of certain targeted topics
          by signing petitions. These petitions are generated by submissions from users (user submissions page coming soon).
          The idea behind the curated approach is to focus on a few topics that are important to the majority of the poulation.
        </p>
        <p>
          To participate simply enter your email and a password above to create an account or log in to yoiur existing account.
          Your email will never be sold, and will be kept confidential.
        </p>
      </div>
      <PetitionDisplay
        petitions={petitions}
        setPetitions={setPetitions}
        setTrigger={setTrigger}
      />
      <News
        petitions={petitions}
        setPetitions={setPetitions}
        setTrigger={setTrigger}
        startTime={startTime}
        endTime={endTime}
        trigger={trigger}
      />
    </div>
  )
}

export default HomeView;
