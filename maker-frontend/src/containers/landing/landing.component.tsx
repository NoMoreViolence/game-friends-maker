import React, { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { AppState } from '@bootstrap';
import { Lang } from '@models';
import { globalActions, userActions } from '@actions';
import { getLanguageSelector } from '@reducers';
import { LandingComponentRootDiv } from './landing.styled';
import LandingHeaderComponent from './components/landing-header';
import Landing01Component from './components/landing-01';
import Landing02Component from './components/landing-02';
import Landing03Component from './components/landing-03';
// import MailChimpComponent from '@components/mail-chimp/mail-chimp.component';

const LandingComponent = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const lang = useSelector(({ global }: AppState) => getLanguageSelector(global), shallowEqual);

  const setLanguage = useCallback((lang: Lang) => dispatch(globalActions.setLanguage({ lang })), []);

  const responseToGoogle = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
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
  }, []);
  const errorToGoogle = useCallback((response: { error: () => void }) => {
    console.log(response);
  }, []);

  return (
    <LandingComponentRootDiv>
      <div className="landing-01">
        <div className="landing-header-wrapper">
          <LandingHeaderComponent />
        </div>
        <div className="landing-01-wrapper">
          <Landing01Component />
        </div>
      </div>

      <div className="landing-02">
        <div className="landing-02-wrapper">
          <Landing02Component />
        </div>
      </div>

      <div className="landing-03">
        <div className="landing-03-wrapper">
          <Landing03Component />
        </div>
      </div>

      <div className="landing-04">
        <div className="landing-04-wrapper">{/* <Landing04Component /> */}</div>
      </div>
    </LandingComponentRootDiv>
  );
};

export default LandingComponent;
