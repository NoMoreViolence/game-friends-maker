import React from 'react';
import { useRouter, useComponentDidMount } from 'helpers';

import { LandingComponentRootDiv } from './landing.styled';
import LandingHeaderComponent from './components/landing-header';
import Landing01Component from './components/landing-01';
import Landing02Component from './components/landing-02';
import Landing03Component from './components/landing-03';
import FooterComponent from './components/footer';

const LandingComponent = () => {
  const { push } = useRouter();

  useComponentDidMount(() => {
    if (localStorage.getItem('token') !== null) {
      push('/app');
    }
  });

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

      <div className="footer">
        <div className="footer-wrapper">
          <FooterComponent />
        </div>
      </div>
    </LandingComponentRootDiv>
  );
};

export default LandingComponent;
