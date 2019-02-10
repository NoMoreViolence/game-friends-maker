import { User } from './user.model';
import { Profile } from './profile.model';

interface AppState {
  user: User;
  profile: Profile;
}

export { AppState, User, Profile };
