import { produce } from 'immer';
import { User } from '../models';
import { SignActions } from '../actions';

const initialState: User = {
  admin: false,
  pending: false,
  success: false,
  failure: false,
  username: '',
  email: ''
};

export const signReducer = produce<User, SignActions.Actions>((draft, action) => {
  switch (action.type) {
    case SignActions.SIGN_IN:
      draft.pending = true;
      return draft;
    case SignActions.SIGN_IN_SUCCESS:
      draft.admin = action.payload.value.admin;
      draft.success = true;
      draft.username = action.payload.value.username;
      draft.email = action.payload.value.email;
      return draft;
    case SignActions.SIGN_IN_FAILURE:
      draft.success = false;
      draft.failure = true;
      draft.admin = false;
      draft.username = '';
      draft.email = '';
      return draft;
    case SignActions.AUTO_SIGN_IN:
      draft.pending = true;
      return draft;
    case SignActions.AUTO_SIGN_IN_SUCCESS:
      draft.admin = action.payload.value.admin;
      draft.success = true;
      draft.username = action.payload.value.username;
      draft.email = action.payload.value.email;
      return draft;
    case SignActions.AUTO_SIGN_IN_FAILURE:
      draft.success = false;
      draft.failure = true;
      draft.admin = false;
      draft.username = '';
      draft.email = '';
      return draft;
    default:
      return draft;
  }
}, initialState);
