import { actionType, appState, DispatchType, team } from 'app/types';
import {
  baseGameURL,
  lastGame,
  scheduleURL,
  standingsURL,
  teamBClass,
  teamAClass,
} from 'helper/constants';
import axios from 'axios';
import { Parser } from 'htmlparser2';
import {
  setRecordAction,
  setProjRecordAction,
  clearProjectionsAction,
} from 'app/action-creators';
import { Dispatch } from 'react';

export const getProjections = async (
  dispatch: Dispatch<actionType> & DispatchType
) => {
  dispatch(clearProjectionsAction());
  const nextGame = await fetchNextGame();
  for (let i = nextGame; i <= lastGame; i++) {
    parseGame(dispatch, baseGameURL + (i < 100 ? '0' + i : i));
  }
};

const parseGame = async (
  dispatch: Dispatch<actionType> & DispatchType,
  gameURL: string
) => {
  let h2Count = 0;
  let inH2 = false;
  let teamA = '';
  let teamB = '';
  let teamAWin = '';
  let teamBWin = '';
  let isOnTeamA = false;
  let isOnTeamB = false;

  const parser = new Parser(
    {
      onopentag(name, attribs) {
        if (name === 'h2') {
          h2Count++;
          inH2 = true;
        } else if (name === 'div' && attribs.class === teamBClass) {
          isOnTeamB = true;
        } else if (name === 'div' && attribs.class === teamAClass) {
          isOnTeamA = true;
        }
      },
      ontext(data) {
        if (inH2 && h2Count === 1) {
          inH2 = false;
          teamB = data;
        } else if (inH2 && h2Count === 2) {
          inH2 = false;
          teamA = data;
        } else if (isOnTeamB) {
          isOnTeamB = false;
          teamBWin = data;
        } else if (isOnTeamA) {
          isOnTeamA = false;
          teamAWin = data;
        }
      },
    },
    { decodeEntities: true }
  );
  try {
    const page = await axios(gameURL);
    parser.write(page.data);
    parser.end();
    dispatch(setProjRecordAction(teamA + ':' + teamAWin));
    dispatch(setProjRecordAction(teamB + ':' + teamBWin));
  } catch (error) {
    console.error(error);
  }
};

export const fetchNextGame = async () => {
  let col = 0;
  let nextGame = -1;

  const parser = new Parser(
    {
      onopentag(name, attribs) {
        if (name === 'td' && col < 3) {
          col++;
        } else if (name === 'a' && col === 3) {
          col++;
          nextGame = parseInt(attribs.href.slice(-3));
        }
      },
    },
    { decodeEntities: true }
  );
  try {
    const page = await axios(scheduleURL);
    parser.write(page.data);
    parser.end();
  } catch (error) {
    console.error(error);
  }
  return nextGame;
};

export const initStandings = async (
  dispatch: Dispatch<actionType> & DispatchType
) => {
  const team: string[] = [];
  const win: string[] = [];
  const loss: string[] = [];
  let isInNameTable = false;
  let isInRecordTable = false;
  let hasBeenInNameTable = false;
  let colCount = 0;
  let spanCount = 0;
  let isInNameA = false;
  let isOnWin = false;
  let isOnLoss = false;

  const parser = new Parser(
    {
      onopentag(name, attribs) {
        if (name === 'tbody' && !hasBeenInNameTable) {
          isInNameTable = true;
        } else if (isInNameTable && name === 'span') {
          spanCount++;
        } else if (isInNameTable && name === 'a' && spanCount === 3) {
          spanCount = 0;
          isInNameA = true;
        } else if (name === 'tbody' && hasBeenInNameTable) {
          isInRecordTable = true;
        } else if (isInRecordTable && name === 'tr') {
          colCount = 0;
        } else if (isInRecordTable && name === 'td') {
          colCount++;
        } else if (isInRecordTable && name === 'span' && colCount === 1) {
          isOnWin = true;
        } else if (isInRecordTable && name === 'span' && colCount === 2) {
          isOnLoss = true;
        }
      },
      ontext(data) {
        if (isInNameA) {
          isInNameA = false;
          team.push(data);
        } else if (isOnWin) {
          isOnWin = false;
          win.push(data);
        } else if (isOnLoss) {
          isOnLoss = false;
          loss.push(data);
        }
      },
      onclosetag(name) {
        if (name === 'tbody' && isInNameTable) {
          isInNameTable = false;
          hasBeenInNameTable = true;
        }
        if (name === 'tbody' && isInRecordTable) {
          isInRecordTable = false;
        }
      },
    },
    { decodeEntities: true }
  );
  try {
    const page = await axios(standingsURL);
    parser.write(page.data);
    parser.end();
    for (let i = 0; i < team.length; i++) {
      dispatch(setRecordAction(team[i] + win[i] + loss[i]));
    }
  } catch (error) {
    console.error(error);
  }
};

export const setTeamRecord = (
  state: appState,
  recordString: string
): appState => {
  const teamName = recordString.slice(0, recordString.length - 4);
  const win = parseInt(recordString.slice(-4, -2));
  const loss = parseInt(recordString.slice(-2));
  const teamObj: team[] = state.teamData.filter(
    (team) => team.name === teamName
  );
  if (teamObj.length !== 1) {
    console.error('no match for team: ' + teamName);
    return state;
  } else {
    const idx = state.teamData.indexOf(teamObj[0]);
    teamObj[0] = {
      ...teamObj[0],
      wins: win,
      losses: loss,
    };
    return {
      ...state,
      teamData: [
        ...state.teamData.slice(0, idx),
        teamObj[0],
        ...state.teamData.slice(idx + 1),
      ],
    };
  }
};

export const setProjTeamRecord = (
  state: appState,
  recordString: string
): appState => {
  const [teamName, winString] = recordString.split(':');
  const win = parseFloat(winString) / 100;
  const loss = 1 - win;
  const teamObj: team[] = state.teamData.filter(
    (team) => team.name === teamName
  );
  if (teamObj.length !== 1) {
    console.error('no match for team: ' + teamName);
    return state;
  } else {
    const idx = state.teamData.indexOf(teamObj[0]);
    teamObj[0] = {
      ...teamObj[0],
      projWins: teamObj[0].projWins + win,
      projLosses: teamObj[0].projLosses + loss,
    };
    return {
      ...state,
      teamData: [
        ...state.teamData.slice(0, idx),
        teamObj[0],
        ...state.teamData.slice(idx + 1),
      ],
    };
  }
};
