import { appState, team } from 'app/types';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  id: number;
};

export const TeamRecord: React.FC<Props> = ({ id }) => {
  const team: team = useSelector((state: appState) => state.teamData[id]);
  return (
    <div className="record-wrapper">
      <div className="display-name">{team.name}</div>
      <div className="display-wins">{team.wins}</div>
      <div className="display-loses">{team.losses}</div>
      <div className="display-proj-wins">
        {Math.round((team.projWins + team.wins) * 10) / 10}
      </div>
      <div className="display-proj-loses">
        {Math.round((team.projLosses + team.losses) * 10) / 10}
      </div>
    </div>
  );
};
