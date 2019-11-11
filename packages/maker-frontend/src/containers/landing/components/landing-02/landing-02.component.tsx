import React from 'react';
import { FormattedMessage } from 'react-intl';
import ScrollAnimation from 'react-animate-on-scroll';

import { color, Span1D5rem, Span2rem } from 'styles';
import { Landing02RootDiv, Landing02TextDiv, Landing02ImageDiv } from './landing-02.styled';

const Landing02Component = () => (
  <Landing02RootDiv>
    <Landing02ImageDiv>
      <ScrollAnimation animateIn="tada" duration={1} animateOnce={true}>
        <img src="/images/illustrators/landing-02.svg" alt="Landing 02" />
      </ScrollAnimation>
    </Landing02ImageDiv>

    <Landing02TextDiv>
      <div>
        <Span2rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
          <FormattedMessage id={'landing.feature.1.title'} />
        </Span2rem>
      </div>

      <div>
        <Span1D5rem color={color.blackLight} weight={'normal'}>
          <FormattedMessage id={'landing.feature.1.sub.1'} />
        </Span1D5rem>
        <Span1D5rem color={color.blackLight} weight={'normal'}>
          <FormattedMessage id={'landing.feature.1.sub.2'} />
        </Span1D5rem>
      </div>
    </Landing02TextDiv>
  </Landing02RootDiv>
);

export default Landing02Component;
