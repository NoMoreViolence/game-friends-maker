import React, { useCallback, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { CSSTransition } from 'react-transition-group';
import { googleClientKey } from '@constants';
import { AppState } from '@bootstrap';
import { Lang } from '@models';
import { globalActions, userActions } from '@actions';
import { getLanguageSelector } from '@reducers';
import { color, SmallSpan, MiddleSpan, BigSpan, MiddleBigSpan } from '@styles';
import {
  LandingComponentRootDiv,
  LandingComponentHeaderDiv,
  LandingComponentLoginContentDiv,
  LandingComponentContentDiv,
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
            <MiddleSpan color={color.white} weight={'bold'}>
              Coöperative
            </MiddleSpan>
          </div>
          <div>
            <MiddleSpan
              className={lang === 'ko' ? 'activate' : ''}
              color={lang === 'ko' ? color.white : color.whiteSoft}
              cursor={lang === 'en'}
              onClick={() => setLanguage('ko')}
            >
              KO
            </MiddleSpan>
            <MiddleSpan color={color.white} weight={'bold'}>
              {' / '}
            </MiddleSpan>
            <MiddleSpan
              className={lang === 'en' ? 'activate' : ''}
              color={lang === 'en' ? color.white : color.whiteSoft}
              cursor={lang === 'ko'}
              onClick={() => setLanguage('en')}
            >
              EN
            </MiddleSpan>
          </div>
        </LandingComponentHeaderDiv>

        <LandingComponentLoginContentDiv backgroundColor={color.primary}>
          <div>
            <BigSpan className="main-message" color={color.white} weight={'bold'}>
              {formatMessage({ id: 'landing.main.message' })}
            </BigSpan>
            <MiddleSpan className="sub-message" color={color.whiteSoft} weight={'300'}>
              {formatMessage({ id: 'landing.sub.message' })}
            </MiddleSpan>
          </div>
          <div>
            <div className="terms">
              <SmallSpan
                onClick={changeDisplayTerms}
                cursor={true}
                color={color.whiteSoft}
                hover={true}
                hoverColor={color.white}
              >
                <FormattedMessage id={'landing.startWithGoogleAgree'} />
              </SmallSpan>
            </div>
            <GoogleLogin
              clientId={googleClientKey}
              onSuccess={responseToGoogle}
              onFailure={errorToGoogle}
              cookiePolicy={'single_host_origin'}
              render={(p?: { onClick: () => void }) =>
                p ? (
                  <div className="google-button">
                    <button onClick={p.onClick}>
                      <GoogleLogoSvg />
                      <MiddleSpan color={color.black} weight={'400'} hover={true} hoverColor={color.white}>
                        {formatMessage({ id: 'landing.startWithGoogle' })}
                      </MiddleSpan>
                    </button>
                  </div>
                ) : (
                  <></>
                )
              }
            />
          </div>
          <div className="bottom-wave"></div>
        </LandingComponentLoginContentDiv>
        <LandingComponentContentDiv backgroundColor={color.primaryDark}>
          <div>
            <img className="landing" src="/images/illustrators/landing-background.png" alt="Landing background" />
          </div>

          <div>
            <MiddleBigSpan color={color.white} weight={'bold'}>
              <FormattedMessage id={'landing.firstform.title'} />
            </MiddleBigSpan>
            <MiddleSpan color={color.whiteSoft} weight={'300'}>
              <FormattedMessage id={'landing.firstform.content'} />
            </MiddleSpan>
          </div>
        </LandingComponentContentDiv>
      </LandingComponentRootDiv>

      <CSSTransition in={displayTerms} timeout={250} unmountOnExit={true} classNames="animation">
        <ModalComponent exit={changeDisplayTerms}>
          <TermsComponent exit={changeDisplayTerms} />
        </ModalComponent>
      </CSSTransition>
    </>
  );
};

export default LandingComponent;
