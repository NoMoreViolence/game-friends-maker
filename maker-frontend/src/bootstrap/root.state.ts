import { RouterState } from 'connected-react-router';
import { User } from '@models';
import { userInitialState } from '@reducers';
import { createBrowserHistory } from 'history';

export interface AppState {
  user: User;
  router: RouterState;
}

const history = createBrowserHistory();
export const preLoadedState: AppState = {
  user: userInitialState,
  router: history,
};
