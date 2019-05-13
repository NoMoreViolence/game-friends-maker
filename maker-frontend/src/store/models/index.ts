import { User } from './user.model';
import { RouterState } from 'connected-react-router';

export interface AppState {
  user: User;
  router: RouterState;
}
export * from './user.model';
export * from './common.model';
