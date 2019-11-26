import React, { createContext, Dispatch, useReducer, useContext } from 'react';
import { User } from 'graphqls/generated/graphql';

type UserState = User | undefined;
const UserStateContext = createContext<UserState | undefined>(undefined);

type Action = { type: 'SAVE'; userState: User | undefined } | { type: 'DELETE' };
type UserStateDispatch = Dispatch<Action>;
const UserStateDispatchContext = createContext<UserStateDispatch | undefined>(undefined);

function userStateReducer(state: UserState, action: Action): UserState | undefined {
  switch (action.type) {
    case 'SAVE':
      if (action.userState) {
        return action.userState;
      }
      return state;
    case 'DELETE':
      return undefined;
    default:
      throw new Error('Unhandled action');
  }
}

export function UserStateContextProvider({ children }: { children: React.ReactNode }) {
  const [userState, dispatch] = useReducer(userStateReducer, undefined);

  return (
    <UserStateDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>{children}</UserStateContext.Provider>
    </UserStateDispatchContext.Provider>
  );
}

export function useUserState(): UserState {
  const state = useContext(UserStateContext);
  return state;
}

export function useUserStateDispatch(): UserStateDispatch {
  const dispatch = useContext(UserStateDispatchContext);
  if (!dispatch) throw new Error('UserStateContextProvider not found');
  return dispatch;
}
