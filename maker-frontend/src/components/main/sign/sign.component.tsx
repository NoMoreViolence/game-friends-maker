import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { googleClientKey } from '@constants';
import { SignComponentProps, SignComponentMethod } from '@src/containers/main/sign/sign.container';
import { toast } from '@lib';

interface GoogleLoginSuccessPayload {
  googleId: string;
  profileObj: {
    email: string;
    name: string;
  };
  tokenId: string;
}

class SignComponent extends Component<SignComponentProps & SignComponentMethod> {
  public responseToGoogle = (response: unknown) => {
    const { register } = this.props;
    register({
      googleId: (response as GoogleLoginSuccessPayload).googleId,
      googleIdToken: (response as GoogleLoginSuccessPayload).tokenId,
      email: (response as GoogleLoginSuccessPayload).profileObj.email,
      name: (response as GoogleLoginSuccessPayload).profileObj.name,
    });
  }

  public errorToGoogle = (response: {error: string}) => toast('info', 'Login Failure', response.error);

  public render = () => {
    const { loginStatus } = this.props;

    return (
      <>
        {loginStatus !== 'success' && (
          <GoogleLogin
            clientId={googleClientKey}
            buttonText="Start With Google"
            onSuccess={this.responseToGoogle}
            onFailure={this.errorToGoogle}
            cookiePolicy="single_host_origin"
          />
        )}
      </>
    );
  }
}

export default SignComponent;
