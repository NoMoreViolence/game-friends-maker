import { RouterState } from 'connected-react-router';
import { history } from 'bootstrap';
import { User, Global, Landing, Post } from 'store/models';
import { userInitialState, globalInitialState, landingInitialState, postInitialState } from 'store/reducers';

export interface AppState {
  global: Global;
  user: User;
  post: Post;
  landing: Landing;
  router: RouterState;
}

export const preLoadedState: AppState = {
  global: globalInitialState,
  post: postInitialState,
  user: userInitialState,
  landing: landingInitialState,
  router: history,
};
