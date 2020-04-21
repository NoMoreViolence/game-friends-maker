import React from 'react';
import { LandingHeaderRootDiv } from './landing-header.styled';
import { Span1D5rem } from 'styles';
import { NavLink } from 'react-router-dom';

const LandingHeaderComponent = () => {
  return (
    <LandingHeaderRootDiv>
      <NavLink className="logo" to="/">
        <img src="/images/icons/cohope-icon.svg" alt="Main logo icon" width="24px" height="24px" />
        <Span1D5rem weight={'900'}>CoHope</Span1D5rem>
      </NavLink>

      <div className="lang"></div>
    </LandingHeaderRootDiv>
  );
};

export default LandingHeaderComponent;
