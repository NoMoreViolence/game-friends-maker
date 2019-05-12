import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { AppState } from '@models';

export const rootReducer = combineReducers({ user: userReducer });
export const metaReducer = (state: AppState, action: { type: string }) => {
  if (action.type === 'RESET') {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    state = (null as unknown) as AppState;
  }

  return rootReducer(state, action);
};
