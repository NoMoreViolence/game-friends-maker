import React from 'react';
import { color, SpanD75rem } from '@styles';
import { FooterRootDiv } from './footer.styled';

const FooterComponent = () => (
  <FooterRootDiv>
    <SpanD75rem color={color.blackLight}>CoHope © 2000.03.23 All Rights Reserved.</SpanD75rem>
  </FooterRootDiv>
);

export default FooterComponent;
