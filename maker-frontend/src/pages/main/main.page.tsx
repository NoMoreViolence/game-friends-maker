import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import LocalizedStrings from 'react-localization';
import { GoogleLogin } from 'react-google-login';
import { Button, Icon } from 'antd';
import { googleClientKey } from '../../constants';

const MainDiv = styled('div')<{ backgroundImage: string }>`
  display: flex;
  background-color: #64b5f6;

  > div {
    height: 100vh;
  }
  .main-introduce {
    display: flex;
    flex-direction: column;
    background-image: ${(props: any) =>
      props.backgroundImage ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.backgroundImage})` : ''};
    background-position: 50% 50%;
    background-size: cover;

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

    > .comment {
      display: flex;
      justify-content: space-around;

      > div {
        display: flex;
        flex-direction: column;

        > .comment-unit {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 1rem;

          font-weight: 400;

          > i {
            margin-right: 1rem;
          }
        }
      }

      span {
        display: inline-flex;
      }
    }
  }
  .enter-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    /* background-color: #ffffff; */
    background-color: #f06292;
  }

  /* Mobile */
  @media screen and (max-width: 1023px) {
    flex-direction: column;

    .main-introduce {
      > .title {
      }

      > .comment {
        margin-top: 5rem;
        > div {
          > .comment-unit {
            font-size: 1.25rem;
          }
        }
      }

      > .mobile-arrow {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        font-size: 2rem;
      }
    }

    .enter-form {
    }
  }

  /* Desktop */
  @media screen and (min-width: 1024px) {
    .main-introduce {
      flex: 1;

      > .title {
      }

      > .comment {
        margin-top: 5rem;
        > div {
          > .comment-unit {
            font-size: 2rem;
          }
        }
      }
      > .mobile-arrow {
        display: none;
      }
    }

    .enter-form {
      flex: 0.5;
    }
  }
`;

const MainPage: FC<RouteComponentProps> = ({ history, location, match }) => {
  const renderCommentUnit = (string: 'match' | 'quick' | 'everywhere') => {
    return (
      <div className="comment-unit">
        <Icon type="thunderbolt" theme="twoTone" />
        <span>{strings[string]}</span>
      </div>
    );
  };

  const responseGoogle = (response: any) => {
    console.log(response);
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
        <div className="comment">
          <div>
            {renderCommentUnit('match')}
            {renderCommentUnit('quick')}
            {renderCommentUnit('everywhere')}
          </div>

          <span />
        </div>
      </div>
      <div className="enter-form">
        <Button type="default" size="large">
          {strings.start}
        </Button>

        <GoogleLogin
          clientId={googleClientKey}
          buttonText="Start With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </MainDiv>
  );
};

const strings = new LocalizedStrings({
  en: {
    match: 'Play game with person you want.',
    quick: 'Find game friends quickly',
    everywhere: 'You can find friends anywhere',
    start: 'Start'
  },
  ko: {
    match: '원하는 사람과 같이 게임하세요.',
    quick: '빠르게 사람을 찾아보세요.',
    everywhere: '언제 어디서나 즐기세요.',
    start: '시작하기'
  }
});

export default MainPage;