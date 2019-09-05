import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Landing01RootDiv, Landing01TextDiv, Landing01ImageDiv } from './landing-01.styled';
import { BigButton, GiantSpan, BigSpan, MiddleBigSpan, MiddleBigButton } from '@styles';

const Landing01Component = () => {
  return (
    <Landing01RootDiv>
      <Landing01TextDiv>
        <div>
          <GiantSpan weight={'bold'} lineHeight={1.25} color={'#111111'}>
            <FormattedMessage id={'landing.main.title.1'} />
          </GiantSpan>
          <GiantSpan weight={'bold'} lineHeight={1.25} color={'#111111'}>
            <FormattedMessage id={'landing.main.title.2'} />
          </GiantSpan>
        </div>

        <div>
          <MiddleBigSpan color={'#111111'}>
            <FormattedMessage id={'landing.main.sub'} />
          </MiddleBigSpan>
        </div>

        <div>
          <MiddleBigButton>
            <MiddleBigSpan color={'#111111'}>
              <FormattedMessage id={'landing.subscribe'} />
            </MiddleBigSpan>
          </MiddleBigButton>
        </div>
      </Landing01TextDiv>
      <Landing01ImageDiv>
        <img src="/images/illustrators/img_hero.svg" alt="Landing 01" />
      </Landing01ImageDiv>
    </Landing01RootDiv>
  );
};

export default Landing01Component;
