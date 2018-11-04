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
      draft.failure = false;
      draft.success = false;
      return draft;
    case SignActions.SIGN_IN_SUCCESS:
      draft.pending = false;
      draft.success = true;
      draft.failure = false;
      draft.admin = action.payload.value.admin;
      draft.username = action.payload.value.username;
      draft.email = action.payload.value.email;
      return draft;
    case SignActions.SIGN_IN_FAILURE:
      draft.pending = false;
      draft.success = false;
      draft.failure = true;
      draft.admin = false;
      draft.username = '';
      draft.email = '';
      return draft;

    case SignActions.LOGOUT:
      return initialState;

    case SignActions.AUTO_SIGN_IN:
      draft.pending = true;
      draft.success = false;
      draft.failure = false;
      return draft;
    case SignActions.AUTO_SIGN_IN_SUCCESS:
      draft.pending = false;
      draft.success = true;
      draft.failure = false;
      draft.admin = action.payload.value.admin;
      draft.username = action.payload.value.username;
      draft.email = action.payload.value.email;
      return draft;
    case SignActions.AUTO_SIGN_IN_FAILURE:
      draft.pending = false;
      draft.success = false;
      draft.failure = true;
      draft.admin = false;
      draft.username = '';
      draft.email = '';
      return draft;

    case SignActions.SIGN_UP:
      draft.pending = true;
      return draft;
    case SignActions.SIGN_UP_SUCCESS:
      draft.pending = false;
      return draft;
    case SignActions.SIGN_UP_FAILURE:
      draft.pending = false;
      return draft;

    default:
      return draft;
  }
}, initialState);
