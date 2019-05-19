import { RouterState } from 'connected-react-router';
import { User } from './user.model';
import { Post } from './post.model';

export interface AppState {
  user: User;
  post: Post;
  router: RouterState;
}
export * from './user.model';
export * from './post.model';
export * from './common.model';
