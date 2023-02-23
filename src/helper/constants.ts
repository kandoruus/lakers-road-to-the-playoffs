import { team } from 'app/types';

export const teamBClass =
  'matchupPredictor__teamValue matchupPredictor__teamValue--b left-0 top-0 flex items-baseline absolute copy';
export const teamAClass =
  'matchupPredictor__teamValue matchupPredictor__teamValue--a bottom-0 right-0 flex items-baseline absolute copy';
export const SET_RECORD = 'SET_RECORD';
export const CLEAR_PROJ = 'CLEAR_PROJ';
export const SET_PROJ_RECORD = 'SET_PROJ_RECORD';
export const lastGame = 385;
export const baseGameURL = 'https://www.espn.com/nba/game?gameId=401469';
export const scheduleURL = 'https://www.espn.com/nba/schedule';
export const standingsURL = 'https://www.espn.com/nba/standings/_/group/league';

const atlanticDiv = [
  'Boston Celtics',
  'Brooklyn Nets',
  'New York Knicks',
  'Philadelphia 76ers',
  'Toronto Raptors',
];
const centralDiv = [
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Detroit Pistons',
  'Indiana Pacers',
  'Milwaukee Bucks',
];
const southeastDiv = [
  'Atlanta Hawks',
  'Charlotte Hornets',
  'Miami Heat',
  'Orlando Magic',
  'Washington Wizards',
];
const pacificDiv = [
  'Golden State Warriors',
  'LA Clippers',
  'Los Angeles Lakers',
  'Phoenix Suns',
  'Sacramento Kings',
];
const northwestDiv = [
  'Denver Nuggets',
  'Minnesota Timberwolves',
  'Oklahoma City Thunder',
  'Portland Trail Blazers',
  'Utah Jazz',
];
const southwestDiv = [
  'Dallas Mavericks',
  'Houston Rockets',
  'Memphis Grizzlies',
  'New Orleans Pelicans',
  'San Antonio Spurs',
];

const makeTeams = () => {
  const teams: team[] = [];
  for (let i = 0; i < atlanticDiv.length; i++) {
    teams.push({
      name: atlanticDiv[i],
      conf: 'Eastern',
      div: 'Atlantic',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }
  for (let i = 0; i < centralDiv.length; i++) {
    teams.push({
      name: centralDiv[i],
      conf: 'Eastern',
      div: 'Central',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }
  for (let i = 0; i < southeastDiv.length; i++) {
    teams.push({
      name: southeastDiv[i],
      conf: 'Eastern',
      div: 'Southeast',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }
  for (let i = 0; i < pacificDiv.length; i++) {
    teams.push({
      name: pacificDiv[i],
      conf: 'Western',
      div: 'Pacific',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }
  for (let i = 0; i < northwestDiv.length; i++) {
    teams.push({
      name: northwestDiv[i],
      conf: 'Western',
      div: 'Northwest',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }
  for (let i = 0; i < southwestDiv.length; i++) {
    teams.push({
      name: southwestDiv[i],
      conf: 'Western',
      div: 'Southwest',
      wins: 0,
      losses: 0,
      projWins: 0,
      projLosses: 0,
    });
  }

  return teams;
};

export const teams: team[] = makeTeams();
