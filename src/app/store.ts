import { configureStore, ThunkAction, Action, Store } from '@reduxjs/toolkit';
import { reducer } from 'app/reducers';
import { actionType, appState, DispatchType } from 'app/types';
import thunk from 'redux-thunk';

export const store: Store<appState, actionType> & {
  dispatch: DispatchType;
} = configureStore({ reducer, middleware: [thunk] });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
