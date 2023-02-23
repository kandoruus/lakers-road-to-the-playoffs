import { actionType } from 'app/types';
import { SET_RECORD, SET_PROJ_RECORD, CLEAR_PROJ } from 'helper/constants';

export const setRecordAction = (teamRecord: string): actionType => {
  return {
    type: SET_RECORD,
    payload: teamRecord,
  };
};

export const setProjRecordAction = (teamRecord: string): actionType => {
  return {
    type: SET_PROJ_RECORD,
    payload: teamRecord,
  };
};

export const clearProjectionsAction = (): actionType => {
  return {
    type: CLEAR_PROJ,
    payload: CLEAR_PROJ,
  };
};
