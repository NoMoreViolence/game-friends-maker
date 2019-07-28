import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@actions';
import { useComponentDidMount } from '@helpers';

const GlobalSignComponent = () => {
  const dispatch = useDispatch();

  const cdm = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      dispatch(userActions.getMyInfo({ token }));
    }
  }, []);
  useComponentDidMount(cdm);

  return <></>;
};

export default GlobalSignComponent;
