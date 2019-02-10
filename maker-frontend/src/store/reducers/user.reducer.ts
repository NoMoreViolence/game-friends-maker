import { produce } from 'immer';
import { UserActions } from './../actions';
import { User } from '../models';

const initialState: User = {
  email: '',
  username: '',
  admin: false,
  token: '',
  loginStatus: 'none',
  registerStatus: 'none'
};

const userReducer = (state: User = initialState, action: UserActions) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN':
        draft.loginStatus = 'pending';
        break;
      case 'LOGIN_SUCCESS':
        draft.token = action.payload.token;
        draft.email = action.payload.email;
        draft.username = action.payload.username;
        draft.admin = action.payload.admin;
        draft.loginStatus = 'success';
        break;
      case 'LOGIN_FAILURE':
        draft.loginStatus = 'none';
        break;

      case 'AUTO_LOGIN':
        draft.token = action.payload.token;
        draft.loginStatus = 'pending';
        break;
      case 'AUTO_LOGIN_SUCCESS':
        draft.loginStatus = 'success';
        draft.email = action.payload.email;
        draft.username = action.payload.username;
        draft.admin = action.payload.admin;
        break;
      case 'AUTO_LOGIN_FAILURE':
        draft.token = '';
        draft.loginStatus = 'none';
        break;

      case 'REGISTER':
        draft.registerStatus = 'pending';
        break;
      case 'REGISTER_SUCCESS':
        draft.registerStatus = 'success';
        break;
      case 'REGISTER_FAILURE':
        draft.registerStatus = 'none';
        break;

      case 'LOGOUT':
        draft.admin = false;
        draft.email = '';
        draft.loginStatus = 'none';
        draft.registerStatus = 'none';
        draft.username = '';

      default:
        break;
    }
  });

export { userReducer };
