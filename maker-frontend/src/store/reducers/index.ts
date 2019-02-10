import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { profileReducer } from './profile.reducer';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer
});

export { reducer };
