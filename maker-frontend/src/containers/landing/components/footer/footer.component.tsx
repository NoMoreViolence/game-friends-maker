import React from 'react';
import { FooterRootDiv } from './footer.styled';
import { Span1D5rem, color } from '@styles';

const FooterComponent = () => (
  <FooterRootDiv>
    <Span1D5rem color={color.blackLight}>CoHope © 2019 All Rights Reserved.</Span1D5rem>
  </FooterRootDiv>
);

export default FooterComponent;
