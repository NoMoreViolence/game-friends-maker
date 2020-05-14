import Hidden from '@material-ui/core/Hidden';
import { Loading } from 'components/loading';
import { getRestAxios, googleClientKey } from 'constants-frontend';
import { toast } from 'lib';
import React, { FC, useCallback, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Col, Colors, Container, fontWeights, Img, media, Row, SpanCustom, zIndex } from 'ui';
import { Header } from './header';

export const Landing: FC = () => {
  return (
    <Container background="linear-gradient(180deg, #060606 0%, #111111 100%);">
      <Header />

      {/* Mobile */}
      <Hidden mdUp implementation="js">
        <StyledContainer padding="48px">
          <LandingPadImg src="/images/illustrators/pad.svg" />
          <Col zIndex={zIndex.level1}>
            <SpanCustom fontSize="48px" lineHeight="100px" fontWeight={fontWeights.bold} color={Colors.white}>
              THINK
            </SpanCustom>
            <SpanCustom fontSize="48px" lineHeight="100px" fontWeight={fontWeights.bold} color={Colors.white}>
              TOGETHER
            </SpanCustom>
            <Row alignItems="center">
              <SpanCustom
                mr="10px"
                fontSize="48px"
                lineHeight="100px"
                fontWeight={fontWeights.bold}
                color={Colors.white}
              >
                FOR
              </SpanCustom>
              <SpanCustom
                fontStyle="italic"
                fontSize="48px"
                padding="10px"
                fontWeight={fontWeights.bold}
                background="#ffdc03"
                color={Colors.black}
              >
                VICTORY.
              </SpanCustom>
            </Row>
          </Col>
          <Row flex={1} alignItems="flex-end" mb={30}>
            <GoogleLoginButton />
          </Row>
        </StyledContainer>
      </Hidden>

      {/* Desktop */}
      <Hidden smDown implementation="js">
        <StyledContainer padding="48px">
          <LandingPadImg src="/images/illustrators/pad.svg" />
          <Col
            position="absolute"
            top="50%"
            right="15%"
            style={{
              transform: 'translateY(-50%)',
            }}
            alignItems="flex-start"
          >
            <SpanCustom fontSize="107px" lineHeight="129px" fontWeight={fontWeights.bold} color={Colors.white}>
              THINK
            </SpanCustom>
            <SpanCustom fontSize="107px" lineHeight="129px" fontWeight={fontWeights.bold} color={Colors.white}>
              TOGETHER
            </SpanCustom>
            <Row>
              <SpanCustom
                mr="10px"
                fontSize="107px"
                lineHeight="129px"
                fontWeight={fontWeights.bold}
                color={Colors.white}
              >
                FOR
              </SpanCustom>
              <SpanCustom
                fontStyle="italic"
                fontSize="107px"
                padding="10px"
                fontWeight={fontWeights.bold}
                background="#ffdc03"
                color={Colors.black}
              >
                VICTORY.
              </SpanCustom>
            </Row>
          </Col>

          <Row flex={1} alignItems="flex-end" mb={30}>
            <GoogleLoginButton />
          </Row>
        </StyledContainer>
      </Hidden>
    </Container>
  );
};

const GoogleLoginButton: FC = () => {
  const { push } = useHistory();
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
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast('success', 'Sign succeed', '');
          localStorage.setItem('token', res.data.data.token);
          push('/app');
        })
        .catch((err) => {
          setIsLoading(false);
          toast('error', 'Sign failed !', 'Check your internet, plz');
        });
    },
    [push]
  );
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    toast('error', 'Sign failed !', 'Check your internet, plz');
    console.log(response);
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <GoogleLogin
        clientId={googleClientKey}
        onSuccess={responseToGoogle}
        onFailure={errorToGoogle}
        cookiePolicy={'single_host_origin'}
        render={(p?: { onClick: () => void }) =>
          p ? (
            <Button
              pr="16px"
              pl="16px"
              fontWeight={fontWeights.bold}
              size="large"
              type="yellow"
              text="Start With Google"
              onClick={p.onClick}
            />
          ) : (
            <></>
          )
        }
      />
    </>
  );
};

const StyledContainer = styled(Container)`
  ${media.mobile} {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 16px;
  }
`;

const LandingPadImg = styled(Img)`
  ${media.mobile} {
    position: absolute;
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }
  ${media.tablet} {
    position: absolute;
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }
  ${media.desktop} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 50%;
  }
  ${media.desktopL} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 50%;
  }
`;
