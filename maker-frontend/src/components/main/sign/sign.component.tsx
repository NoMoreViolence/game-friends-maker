import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { googleClientKey } from '@constants';
import { ISignComponentProps, ISignComponentMethod } from '@src/containers/main/sign/sign.container';
import { toast } from '@lib';

interface IGoogleLoginSuccessPayload {
  googleId: string;
  profileObj: {
    email: string;
    name: string;
  };
  tokenId: string;
}

class SignComponent extends Component<ISignComponentProps & ISignComponentMethod> {
  public responseToGoogle = (response: any) =>
    this.props.register({
      googleId: (response as IGoogleLoginSuccessPayload).googleId,
      googleIdToken: (response as IGoogleLoginSuccessPayload).tokenId,
      email: (response as IGoogleLoginSuccessPayload).profileObj.email,
      name: (response as IGoogleLoginSuccessPayload).profileObj.name
    });
  public errorToGoogle = (response: any) => toast('info', 'Login Failure', response.error);

  render = () => (
    <>
      {this.props.registerStatus !== 'success' && (
        <GoogleLogin
          clientId={googleClientKey}
          buttonText="Start With Google"
          onSuccess={this['responseToGoogle']}
          onFailure={this['errorToGoogle']}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </>
  );
}

export default SignComponent;
