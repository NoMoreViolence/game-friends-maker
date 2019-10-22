import React from 'react';
import { FormattedMessage } from 'react-intl';
import ScrollAnimation from 'react-animate-on-scroll';

import { color, Span1D5rem, Span2rem } from '@styles';
import { Landing03RootDiv, Landing03TextDiv, Landing03ImageDiv } from './landing-03.styled';

const Landing03Component = () => (
  <Landing03RootDiv>
    <Landing03TextDiv>
      <div>
        <Span2rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
          <FormattedMessage id={'landing.feature.2.title'} />
        </Span2rem>
      </div>

      <div>
        <Span1D5rem color={color.blackLight} weight={'normal'}>
          <FormattedMessage id={'landing.feature.2.sub.1'} />
        </Span1D5rem>
        <Span1D5rem color={color.blackLight} weight={'normal'}>
          <FormattedMessage id={'landing.feature.2.sub.2'} />
        </Span1D5rem>
      </div>
    </Landing03TextDiv>

    <Landing03ImageDiv>
      <ScrollAnimation animateIn="tada" duration={1} animateOnce={true}>
        <img src="/images/illustrators/welcome.svg" alt="Landing 03" />
      </ScrollAnimation>
    </Landing03ImageDiv>
  </Landing03RootDiv>
);

export default Landing03Component;
