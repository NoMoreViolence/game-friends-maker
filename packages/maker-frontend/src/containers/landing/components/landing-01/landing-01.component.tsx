import React, { useCallback, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { toast } from 'lib';
import { useRouter } from 'helpers';

import { Span1D5rem, color, Span4rem, Button1D5rem } from 'styles';
import { Landing01RootDiv, Landing01TextDiv, Landing01ImageDiv } from './landing-01.styled';
import LoadingComponent from 'components/loading';
import GoogleLogoSvg from 'svgs/google-logo';
import { googleClientKey, getRestAxios } from '../../../../constants';

const Landing01Component = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const responseToGoogle = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      const googleResponse = (response as unknown) as GoogleLoginResponse;
      const authResponse = googleResponse.getAuthResponse();
      const basicProfile = googleResponse.getBasicProfile();

      setIsLoading(true);
      getRestAxios()
        .post(
          '/login-or-register',
          {
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            googleId: basicProfile.getId(),
            googleIdToken: authResponse.id_token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          toast('success', 'Sign succeed', '');
          localStorage.setItem('token', res.data.data.token);
          push('/app');
        })
        .catch(err => {
          toast('error', 'Sign failed !', 'Check your internet, plz');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [push],
  );
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    toast('error', 'Sign failed !', 'Check your internet, plz');
    console.log(response);
  }, []);

  return (
    <Landing01RootDiv>
      <LoadingComponent isLoading={isLoading} />
      <Landing01TextDiv>
        <div>
          <Span4rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
            More cooperative,
          </Span4rem>
          <Span4rem weight={'bold'} lineHeight={1.25} color={color.blackLight}>
            More teamwork.
          </Span4rem>
        </div>

        <div>
          <Span1D5rem color={color.blackLight} weight={'600'}>
            Team up and strategize before the game.
          </Span1D5rem>
          <Span1D5rem color={color.blackLight} weight={'600'}>
            Team luck is no longer luck.
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
                    Sign with Google
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
