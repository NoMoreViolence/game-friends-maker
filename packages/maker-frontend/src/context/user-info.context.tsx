import React, { createContext, Dispatch, useReducer, useContext } from 'react';
import { User_user } from 'graphqls/queries/__generated__/User';

const initUser: User_user | undefined = {
  __typename: 'User',
  _id: '',
  name: '',
  email: '',
  posts: [],
  relatedTeams: [],
  pendingTeams: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
};

type UserState = { user: User_user | undefined };
const UserStateContext = createContext<UserState | undefined>(undefined);

type Action = { type: 'SAVE'; userState: User_user } | { type: 'DELETE' };
type UserStateDispatch = Dispatch<Action>;
const UserStateDispatchContext = createContext<UserStateDispatch | undefined>(undefined);

function userStateReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'SAVE':
      if (action.userState) {
        return { user: action.userState };
      }
      return state;
    case 'DELETE':
      return { user: initUser };
    default:
      throw new Error('Unhandled action');
  }
}

export function UserStateContextProvider({ children }: { children: React.ReactNode }) {
  const [userState, dispatch] = useReducer(userStateReducer, { user: initUser });

  return (
    <UserStateDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>{children}</UserStateContext.Provider>
    </UserStateDispatchContext.Provider>
  );
}

export function useUserState(): UserState {
  const state = useContext(UserStateContext);
  if (!state) throw new Error('UserStateContextProvider not found');
  return state;
}

export function useUserStateDispatch(): UserStateDispatch {
  const dispatch = useContext(UserStateDispatchContext);
  if (!dispatch) throw new Error('UserStateContextProvider not found');
  return dispatch;
}
