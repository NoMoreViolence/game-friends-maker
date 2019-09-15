import { RouterState } from 'connected-react-router';
import { history } from '@bootstrap';
import { User, Global, Landing } from '@models';
import { userInitialState, globalInitialState, landingInitialState } from '@reducers';

export interface AppState {
  global: Global;
  user: User;
  landing: Landing;
  router: RouterState;
}

export const preLoadedState: AppState = {
  global: globalInitialState,
  user: userInitialState,
  landing: landingInitialState,
  router: history,
};
