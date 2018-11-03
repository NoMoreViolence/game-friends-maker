import { ActionReducer, State, Action } from '@ngrx/store';
import { AppState } from '../models';

interface Payload {
  [key: string]: any;
}

interface PrivateAction extends Action {
  readonly payload?: Payload;
}

export const metaReducer = () => (reducer: ActionReducer<AppState>) => (state: AppState, action: PrivateAction): AppState => {
  const nextState = reducer(state, action);
  const { type, payload } = action;

  const adjustedType = action.type;
  console.group(adjustedType);
  console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold; font-size: 15px`, state);
  console.log(`%c action payload`, `color: #03A9F4; font-weight: bold; font-size: 15px`, payload);
  console.log(`%c next state`, `color: #4CAF50; font-weight: bold; font-size: 15px`, nextState);
  console.groupEnd();

  return nextState;
};
