import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AppState } from '@bootstrap';
import { getUserStatusSelector } from '@reducers';

import { LandingComponentRootDiv } from './landing.styled';
import LandingHeaderComponent from './components/landing-header';
import Landing01Component from './components/landing-01';
import Landing02Component from './components/landing-02';
import Landing03Component from './components/landing-03';
import Landing04Component from './components/landing-04';
import FooterComponent from './components/footer';

const LandingComponent = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector(({ user }: AppState) => getUserStatusSelector(user), shallowEqual);

  useEffect(() => {
    if (loginStatus === 'success') {
      dispatch(push('/app'));
    }
  }, [dispatch, loginStatus]);

  return (
    <LandingComponentRootDiv>
      <div className="landing-01">
        <div className="landing-header-wrapper">
          <LandingHeaderComponent />
        </div>
        <div className="landing-01-wrapper">
          <Landing01Component />
        </div>
      </div>

      <div className="landing-02">
        <div className="landing-02-wrapper">
          <Landing02Component />
        </div>
      </div>

      <div className="landing-03">
        <div className="landing-03-wrapper">
          <Landing03Component />
        </div>
      </div>

      <div className="landing-04">
        <div className="landing-04-wrapper">
          <Landing04Component />
        </div>
      </div>

      <div className="footer">
        <div className="footer-wrapper">
          <FooterComponent />
        </div>
      </div>
    </LandingComponentRootDiv>
  );
};

export default LandingComponent;
