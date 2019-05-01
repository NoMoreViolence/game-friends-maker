import { produce } from 'immer';

const initialState: any = {
  email: '',
  admin: false,
  token: '',
  loginStatus: 'none',
  autoLoginStatus: 'none',
  registerStatus: 'none'
};

const userReducer = (state: any = initialState, action: any) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case 'LOGIN':
        draft.loginStatus = 'pending';
        break;
      case 'LOGIN_SUCCESS':
        draft.token = action.payload.token;
        draft.email = action.payload.email;
        draft.admin = action.payload.admin;
        draft.loginStatus = 'success';
        break;
      case 'LOGIN_FAILURE':
        draft.loginStatus = 'error';
        break;

      case 'AUTO_LOGIN':
        draft.token = action.payload.token;
        draft.loginStatus = 'pending';
        draft.autoLoginStatus = 'pending';
        break;
      case 'AUTO_LOGIN_SUCCESS':
        draft.loginStatus = 'success';
        draft.autoLoginStatus = 'success';
        draft.email = action.payload.email;
        draft.admin = action.payload.admin;
        break;
      case 'AUTO_LOGIN_FAILURE':
        draft.token = '';
        draft.loginStatus = 'error';
        draft.autoLoginStatus = 'error';
        break;

      case 'REGISTER':
        draft.registerStatus = 'pending';
        break;
      case 'REGISTER_SUCCESS':
        draft.registerStatus = 'success';
        break;
      case 'REGISTER_FAILURE':
        draft.registerStatus = 'error';
        break;

      case 'LOGOUT':
        draft.admin = false;
        draft.email = '';
        draft.loginStatus = 'none';
        draft.registerStatus = 'none';
        break;

      default:
        break;
    }
  });

export { userReducer };
