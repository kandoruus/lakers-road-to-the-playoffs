import React, { useEffect } from 'react';
import 'App.css';
import { TeamRecord } from 'components/TeamRecord';
import { initStandings, getProjections } from 'helper/functions';
import { useAppDispatch, useAppSelector } from 'app/hooks';

function App() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    getProjections(dispatch);
  };
  useEffect(() => {
    initStandings(dispatch);
  }, []);
  return (
    <div>
      <button onClick={handleClick}>Get Projections</button>
      {[...Array(30)].map((_, i) => (
        <TeamRecord key={i} id={i} />
      ))}
    </div>
  );
}

export default App;
