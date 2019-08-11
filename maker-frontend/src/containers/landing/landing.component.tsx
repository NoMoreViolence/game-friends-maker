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
import { color, SmallSpan, MiddleSpan, MiddleBigSpan, TinySpan, BigSpan, GiantSpan } from '@styles';
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
import MailChimpComponent from '@components/mail-chimp/mail-chimp.component';

const LandingComponent = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const lang = useSelector(({ global }: AppState) => getLanguageSelector(global), shallowEqual);

  const [displayTerms, setDisplayTerms] = useState(false);

  const setLanguage = useCallback((lang: Lang) => dispatch(globalActions.setLanguage({ lang })), []);
  const changeDisplayTerms = useCallback(() => setDisplayTerms(!displayTerms), [displayTerms]);

  const responseToGoogle = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleResponse = (response as unknown) as GoogleLoginResponse;
    const authResponse = googleResponse.getAuthResponse();
    const basicProfile = googleResponse.getBasicProfile();

    dispatch(
      userActions.register({
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        googleId: authResponse.access_token,
        googleIdToken: authResponse.id_token,
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
            <div>
              <MiddleBigSpan color={color.black} weight={'bold'}>
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
          </div>
        </LandingComponentHeaderDiv>

        <LandingComponentLoginContentDiv backgroundUrl={'/images/illustrators/main-background.jpg'}>
          <div>
            <ScrollAnimation animateIn="bounceInLeft" animateOut="bounceOutLeft" duration={1.5} animateOnce={true}>
              <GiantSpan className="main-message" color={color.white} weight={'bold'} align={'center'}>
                {formatMessage({ id: 'landing.main.message' })}
              </GiantSpan>
              <MiddleSpan className="sub-message" color={color.white} weight={'300'} align={'center'}>
                {formatMessage({ id: 'landing.sub.message' })}
              </MiddleSpan>
            </ScrollAnimation>
          </div>
          <div>
            <MailChimpComponent />
            {/* <GoogleLogin
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
            <ScrollAnimation
              animateIn="bounceInRight"
              animateOut="bounceOutRight"
              duration={1.5}
              animateOnce={true}
              className="terms"
            >
              <TinySpan
                onClick={changeDisplayTerms}
                cursor={'pointer'}
                color={color.whiteSoft}
                hover={true}
                hoverColor={color.white}
              >
                <FormattedMessage id={'landing.startWithGoogleAgree'} />
              </TinySpan>
            </ScrollAnimation> */}
          </div>
        </LandingComponentLoginContentDiv>
        <LandingComponentContentDiv backgroundColor={color.white}>
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
            <MiddleBigSpan color={color.primaryDark} weight={'bold'} align={'center'}>
              <FormattedMessage id={'landing.firstform.title'} />
            </MiddleBigSpan>
            <MiddleSpan color={color.primary} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.firstform.content.first'} />
            </MiddleSpan>
            <MiddleSpan color={color.primary} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.firstform.content.second'} />
            </MiddleSpan>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
            <img className="landing" src="/images/illustrators/background-01.jpg" alt="Landing background" />
          </ScrollAnimation>
        </LandingComponentContentDiv>

        <LandingComponentContentDiv backgroundColor={color.white} reverse={true}>
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
            <MiddleBigSpan color={color.primaryDark} weight={'bold'} align={'center'}>
              <FormattedMessage id={'landing.secondform.title'} />
            </MiddleBigSpan>
            <MiddleSpan color={color.primary} weight={'300'} align={'center'}>
              <FormattedMessage id={'landing.secondform.content.first'} />
            </MiddleSpan>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce={true}>
            <img className="landing" src="/images/illustrators/background-03.jpg" alt="Landing background" />
          </ScrollAnimation>
        </LandingComponentContentDiv>

        <LandingComponentBottom>
          <div>
            <img src="/images/logo/logo-text.svg" alt="Logo" />
          </div>
        </LandingComponentBottom>
      </LandingComponentRootDiv>

      <ModalComponent display={displayTerms} exit={changeDisplayTerms}>
        <TermsComponent exit={changeDisplayTerms} />
      </ModalComponent>
    </>
  );
};

export default LandingComponent;
