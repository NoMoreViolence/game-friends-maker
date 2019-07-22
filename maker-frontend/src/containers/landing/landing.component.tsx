import React, { useCallback, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { CSSTransition } from 'react-transition-group';
import { googleClientKey } from '@constants';
import { AppState } from '@bootstrap';
import { Lang } from '@models';
import { globalActions } from '@actions';
import { getLanguageSelector } from '@reducers';
import {
  LandingComponentRootDiv,
  LandingComponentHeaderDiv,
  LandingComponentLoginContentDiv,
  LandingComponentContentDiv,
} from './landing.styled';
import { color } from '@styles';
import GoogleLogoSvg from '@svgs/google-logo';
import ModalComponent from '@components/modal';
import TermsComponent from './components/terms';

const LandingComponent = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const lang = useSelector(({ global }: AppState) => getLanguageSelector(global), shallowEqual);

  const [displayTerms, setTerms] = useState(false);

  const setLanguage = useCallback((lang: Lang) => dispatch(globalActions.setLanguage({ lang })), []);
  const changeDisplayTerms = useCallback(() => setTerms(!displayTerms), [displayTerms]);
  const responseToGoogle = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // (response as unknown as GoogleLoginResponse)
  }, []);
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    // console.log(response);
  }, []);

  return (
    <>
      <LandingComponentRootDiv>
        <LandingComponentHeaderDiv>
          <div>
            <span>Cooperative</span>
          </div>
          <div>
            <span className={lang === 'ko' ? 'activate' : ''} onClick={() => setLanguage('ko')}>
              KO
            </span>
            <span> / </span>
            <span className={lang === 'en' ? 'activate' : ''} onClick={() => setLanguage('en')}>
              EN
            </span>
          </div>
        </LandingComponentHeaderDiv>
        <LandingComponentLoginContentDiv backgroundColor={color.primary}>
          <div>
            <span className="main-message">{formatMessage({ id: 'landing.main.message' })}</span>
            <span className="sub-message">{formatMessage({ id: 'landing.sub.message' })}</span>
          </div>
          <div>
            <div className="terms">
              <span onClick={changeDisplayTerms}>
                <FormattedMessage id={'landing.startWithGoogleAgree'} />
              </span>
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
                      <span>{formatMessage({ id: 'landing.startWithGoogle' })}</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )
              }
            />
          </div>
        </LandingComponentLoginContentDiv>
        {/* <LandingComponentContentDiv backgroundColor={color.primaryDark}>
        <div>
          <img className="landing" src="/images/illustrators/landing-background.png" alt="Landing background" />
        </div>
      </LandingComponentContentDiv> */}
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
