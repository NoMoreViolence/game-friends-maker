import React, { useCallback, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import ScrollAnimation from 'react-animate-on-scroll';
import { googleClientKey } from '@constants';
import { AppState } from '@bootstrap';
import { Lang } from '@models';
import { globalActions, userActions } from '@actions';
import { getLanguageSelector } from '@reducers';
import { color, SmallSpan, MiddleSpan, MiddleBigSpan } from '@styles';
import {
  LandingComponentRootDiv,
  LandingComponentHeaderDiv,
  LandingComponentLoginContentDiv,
  LandingComponentContentDiv,
  LandingComponentBottom,
} from './landing.styled';
import GoogleLogoSvg from '@svgs/google-logo';
import ModalComponent from '@components/modal';
import TermsComponent from '@containers/landing/components/terms';

const LandingComponent = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const lang = useSelector(({ global }: AppState) => getLanguageSelector(global), shallowEqual);

  const [displayTerms, setTerms] = useState(false);

  const setLanguage = useCallback((lang: Lang) => dispatch(globalActions.setLanguage({ lang })), []);
  const changeDisplayTerms = useCallback(() => setTerms(!displayTerms), [displayTerms]);
  const responseToGoogle = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleResponse = (response as unknown) as GoogleLoginResponse;
    const authResponse = googleResponse.getAuthResponse();
    const { getEmail, getName } = googleResponse.getBasicProfile();

    dispatch(
      userActions.register({
        email: getEmail(),
        name: getName(),
        googleId: authResponse.id_token,
        googleIdToken: authResponse.access_token,
      }),
    );
  }, []);
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    // console.log(response);
  }, []);

  return (
    <>
      <LandingComponentRootDiv>
        <LandingComponentHeaderDiv>
          <div>
            <MiddleBigSpan color={color.white} weight={'bold'}>
              Coöperative
            </MiddleBigSpan>
          </div>
          <div>
            <MiddleSpan
              color={lang === 'ko' ? color.primaryDark : color.primaryLight}
              cursor={lang === 'en' ? 'pointer' : 'unset'}
              onClick={() => setLanguage('ko')}
            >
              KO
            </MiddleSpan>
            <MiddleSpan color={color.primaryDark} weight={'bold'}>
              {' / '}
            </MiddleSpan>
            <MiddleSpan
              color={lang === 'en' ? color.primaryDark : color.primaryLight}
              cursor={lang === 'ko' ? 'pointer' : 'unset'}
              onClick={() => setLanguage('en')}
            >
              EN
            </MiddleSpan>
          </div>
        </LandingComponentHeaderDiv>

        <LandingComponentLoginContentDiv>
          <div>
            <ScrollAnimation animateIn="bounceInLeft" animateOut="bounceOutLeft" duration={1.5} animateOnce={true}>
              <MiddleBigSpan className="main-message" color={color.white} weight={'bold'} align={'center'}>
                {formatMessage({ id: 'landing.main.message' })}
              </MiddleBigSpan>
              <MiddleSpan className="sub-message" color={color.whiteSoft} weight={'300'} align={'center'}>
                {formatMessage({ id: 'landing.sub.message' })}
              </MiddleSpan>
            </ScrollAnimation>
          </div>
          <div>
            <ScrollAnimation
              animateIn="bounceInRight"
              animateOut="bounceOutRight"
              duration={1.5}
              animateOnce={true}
              className="terms"
            >
              <SmallSpan
                onClick={changeDisplayTerms}
                cursor={'pointer'}
                color={color.primaryLight}
                hover={true}
                hoverColor={color.white}
              >
                <FormattedMessage id={'landing.startWithGoogleAgree'} />
              </SmallSpan>
            </ScrollAnimation>
            <GoogleLogin
              clientId={googleClientKey}
              onSuccess={responseToGoogle}
              onFailure={errorToGoogle}
              cookiePolicy={'single_host_origin'}
              render={(p?: { onClick: () => void }) =>
                p ? (
                  <ScrollAnimation
                    animateIn="bounceInRight"
                    animateOut="bounceOutRight"
                    duration={1.5}
                    animateOnce={true}
                    className="google-button"
                  >
                    <button onClick={p.onClick}>
                      <GoogleLogoSvg />
                      <MiddleSpan color={color.black} weight={'400'}>
                        {formatMessage({ id: 'landing.startWithGoogle' })}
                      </MiddleSpan>
                    </button>
                  </ScrollAnimation>
                ) : (
                  <></>
                )
              }
            />
          </div>
        </LandingComponentLoginContentDiv>
        <LandingComponentContentDiv backgroundColor={color.primaryDark}>
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <MiddleBigSpan color={color.white} weight={'bold'} align={'center'}>
              <FormattedMessage id={'landing.firstform.title'} />
            </MiddleBigSpan>
            <MiddleSpan color={color.whiteSoft} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.firstform.content.first'} />
            </MiddleSpan>
            <MiddleSpan color={color.whiteSoft} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.firstform.content.second'} />
            </MiddleSpan>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <img className="landing" src="/images/illustrators/landing-background.png" alt="Landing background" />
          </ScrollAnimation>
        </LandingComponentContentDiv>

        <LandingComponentContentDiv backgroundColor={color.primaryLight} reverse={true}>
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <MiddleBigSpan color={color.white} weight={'bold'} align={'center'}>
              <FormattedMessage id={'landing.secondform.title'} />
            </MiddleBigSpan>
            <MiddleSpan color={color.whiteSoft} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.secondform.content.first'} />
            </MiddleSpan>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
            <img className="landing" src="/images/illustrators/play-game.svg" alt="Landing background" />
          </ScrollAnimation>
        </LandingComponentContentDiv>

        <LandingComponentBottom>
          <div>
            <img src="/images/logo/logo-text.svg" alt="Logo" />
          </div>
          <div>{/* <SmallSpan color={color.white}>© 2019 JIHOON LEE, INC. ALL RIGHTS RESERVED</SmallSpan> */}</div>
        </LandingComponentBottom>
      </LandingComponentRootDiv>

      <ModalComponent display={displayTerms} exit={changeDisplayTerms}>
        <TermsComponent exit={changeDisplayTerms} />
      </ModalComponent>
    </>
  );
};

export default LandingComponent;
