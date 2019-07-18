import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useStore, useDispatch, shallowEqual } from 'react-redux';
import { userActions } from '@actions';
import { AppState } from '@bootstrap';
import useReactRouter from 'use-react-router';

const App = () => {
  // const [store, setStore] = useState(() => useStore<AppState>());
  // const [state, setState] = useState(() => store.getState());

  // console.log(state);
  // console.log(useStore<AppState>().getState());

  const { location } = useSelector((state: AppState) => state.router, shallowEqual);
  console.log(location);

  const { history } = useReactRouter();
  console.log(history);

  return (
    <div>
      <button
        onClick={() => {
          // store.dispatch(
          //             userActions.register({
          //               name: '',
          //               email: '',
          //               googleId: '',
          //               googleIdToken: '',
          //             }),
          //           )
        }}
      ></button>
    </div>
  );
};

export default App;
