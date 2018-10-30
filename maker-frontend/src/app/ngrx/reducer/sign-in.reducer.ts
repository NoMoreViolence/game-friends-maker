import { produce } from 'immer';
import { User } from '../models';
import { SignActions } from '../actions';

const initialState: User = {
  admin: false,
  logined: false,
  username: '',
  email: ''
};

export const signReducer = produce<User, SignActions.Actions>((draft, action) => {
  switch (action.type) {
    case SignActions.SIGN_IN:
      return draft;
    case SignActions.SIGN_IN_SUCCESS:
      draft.admin = action.payload.admin;
      draft.logined = true;
      draft.username = action.payload.username;
      draft.email = action.payload.email;
      return draft;
    default:
      return draft;
  }
}, initialState);
