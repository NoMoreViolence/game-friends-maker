import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ScrollAnimation from 'react-animate-on-scroll';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { googleClientKey } from '../../../../constants';
import { userActions } from 'store/reducers';
import { Span1D5rem, color, Span4rem, Button1D5rem } from 'styles';
import { Landing01RootDiv, Landing01TextDiv, Landing01ImageDiv } from './landing-01.styled';
import GoogleLogoSvg from 'svgs/google-logo';

const Landing01Component = () => {
  const dispatch = useDispatch();

  const responseToGoogle = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      const googleResponse = (response as unknown) as GoogleLoginResponse;
      const authResponse = googleResponse.getAuthResponse();
      const basicProfile = googleResponse.getBasicProfile();

      dispatch(
        userActions.register({
          email: basicProfile.getEmail(),
          name: basicProfile.getName(),
          googleId: basicProfile.getId(),
          googleIdToken: authResponse.id_token,
        }),
      );
    },
    [dispatch],
  );
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    console.log(response);
  }, []);

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
                  <Button1D5rem
                    style={{ display: 'flex', alignItems: 'center' }}
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
                    onClick={p.onClick}
                  >
                    <GoogleLogoSvg style={{ marginRight: '1rem' }} />
                    <FormattedMessage id={'landing.google.signin.and.signup'} />
                  </Button1D5rem>
                </ScrollAnimation>
              ) : (
                <></>
              )
            }
          />
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
