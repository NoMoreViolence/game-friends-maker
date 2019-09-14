import React from 'react';
import { FormattedMessage } from 'react-intl';
import ScrollAnimation from 'react-animate-on-scroll';

import { Span1D5rem, Button1D25rem, color, Span4rem } from '@styles';
import { Landing01RootDiv, Landing01TextDiv, Landing01ImageDiv } from './landing-01.styled';

const Landing01Component = () => {
  return (
    <Landing01RootDiv>
      <Landing01TextDiv>
        <div>
          <Span4rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
            <FormattedMessage id={'landing.main.title.1'} />
          </Span4rem>
          <Span4rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
            <FormattedMessage id={'landing.main.title.2'} />
          </Span4rem>
        </div>

        <div>
          <Span1D5rem color={color.blackLight} weight={'600'}>
            <FormattedMessage id={'landing.main.sub.1'} />
          </Span1D5rem>
          <Span1D5rem color={color.blackLight} weight={'600'}>
            <FormattedMessage id={'landing.main.sub.2'} />
          </Span1D5rem>
        </div>

        <div>
          <Button1D25rem
            hover={true}
            cursor={'pointer'}
            weight={'bold'}
            color={color.blackLight}
            hoverColor={color.yellow}
            backgroundColor={color.yellow}
            hoverBackgroundColor={color.black}
            borderColor={color.black}
            hoverBorderColor={color.black}
            transition={true}
          >
            <FormattedMessage id={'landing.subscribe'} />
          </Button1D25rem>
        </div>
      </Landing01TextDiv>
      <Landing01ImageDiv>
        <ScrollAnimation animateIn="tada" duration={1} animateOnce={true}>
          <img src="/images/illustrators/img_hero.svg" alt="Landing 01" />
        </ScrollAnimation>
      </Landing01ImageDiv>
    </Landing01RootDiv>
  );
};

export default Landing01Component;
