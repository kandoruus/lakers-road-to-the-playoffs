import { SET_PROJ_RECORD, SET_RECORD, CLEAR_PROJ } from 'helper/constants';
import { actionType, appState } from 'app/types';
import { teams } from 'helper/constants';
import { setProjTeamRecord, setTeamRecord } from 'helper/functions';

const initState: appState = {
  teamData: [...teams],
};

export const reducer = (
  state: appState = initState,
  action: actionType
): appState => {
  switch (action.type) {
    case CLEAR_PROJ:
      return {
        teamData: state.teamData.map((team) => {
          return {
            ...team,
            projLosses: 0,
            projWins: 0,
          };
        }),
      };
    case SET_RECORD:
      return setTeamRecord(state, action.payload);
    case SET_PROJ_RECORD:
      return setProjTeamRecord(state, action.payload);
    default:
      return state;
  }
};
