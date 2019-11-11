import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/reducers';
import { useComponentDidMount } from 'helpers';

const GlobalSignComponent = () => {
  const dispatch = useDispatch();

  const cdm = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      dispatch(userActions.getMyInfo({ token }));
    }
  }, [dispatch]);
  useComponentDidMount(cdm);

  return <></>;
};

export default GlobalSignComponent;
