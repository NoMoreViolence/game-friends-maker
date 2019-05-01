import React, { FC } from 'react';
import styled from 'styled-components';
import LocalizedStrings from 'react-localization';
import { Button, Icon } from 'antd';

const MainDiv = styled('div')<{ backgroundImage: string }>`
  display: flex;
  background-color: #64b5f6;

  > div {
    height: 100vh;
  }
  .main-introduce {
    display: flex;
    background-image: ${(props: any) =>
      props.backgroundImage ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.backgroundImage})` : ''};
    background-position: 50% 50%;
    background-size: cover;
  }
  .enter-form {
  }

  /* Mobile */
  @media screen and (max-width: 1023px) {
    flex-direction: column;

    .main-introduce {
      display: flex;
    }

    .enter-form {
    }
  }

  /* Desktop */
  @media screen and (min-width: 1024px) {
    .main-introduce {
      flex: 1;
      display: flex;
      flex-direction: column;

      > .title {
        margin-top: 3rem;
        display: flex;
        justify-content: space-around;

        > div {
          display: flex;
          flex-direction: column;
        }
        span {
          display: inline-flex;
          font-size: 5rem;
          color: #a9ee59;
        }
      }
    }

    .enter-form {
      flex: 0.5;
    }
  }
`;

const MainPage: FC = () => {
  const renderMainText = (text: 'match' | 'quick' | 'everywhere') => {
    return (
      <div>
        <Icon type="thunderbolt" />
        <span>{strings[text]}</span>
      </div>
    );
  };

  return (
    <MainDiv backgroundImage={'/images/illustrators/background-1-color.svg'}>
      <div className="main-introduce">
        <div className="title">
          <div>
            <span>Game</span>
            <span>Friends</span>
            <span>Maker</span>
          </div>
          <span />
        </div>
        <div>
          {renderMainText('match')}
          {renderMainText('quick')}
          {renderMainText('everywhere')}
        </div>
      </div>
      <div className="enter-form">
        <Button type="primary">Fucking</Button>
      </div>
    </MainDiv>
  );
};

const strings = new LocalizedStrings({
  en: {
    match: 'Play game with person you want.',
    quick: 'Find game friends quickly',
    everywhere: 'You can find friends anywhere'
  },
  ko: {
    match: '원하는 사람과 같이 게임하세요.',
    quick: '빠르게 사람을 찾아보세요.',
    everywhere: '언제 어디서나 즐기세요.'
  }
});

export default MainPage;
