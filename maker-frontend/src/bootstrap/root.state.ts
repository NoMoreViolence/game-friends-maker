import { RouterState } from 'connected-react-router';
import { history } from '@bootstrap';
import { User, Global } from '@models';
import { userInitialState, globalInitialState } from '@reducers';

export interface AppState {
  global: Global;
  user: User;
  router: RouterState;
}

export const preLoadedState: AppState = {
  global: globalInitialState,
  user: userInitialState,
  router: history,
};
