export type team = {
  name: string;
  conf: string;
  div: string;
  wins: number;
  losses: number;
  projWins: number;
  projLosses: number;
};

export type appState = {
  teamData: team[];
};

export type actionType = {
  type: string;
  payload: string;
};

export type DispatchType = (args: actionType) => actionType;
