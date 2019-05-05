import { produce } from 'immer';
import { User } from '../models';
import { SignActions } from '../actions';

const initialState: User = {
  email: '',
  token: '',
  expiresIn: 0
};

export const userReducer = (state: User = initialState, action: SignActions) =>
  produce(state, (draft: User) => {
    switch (action.type) {
      case 'LOGIN':
        break;
      case 'LOGIN_SUCCESS':
        break;

      default:
        break;
    }
  });
