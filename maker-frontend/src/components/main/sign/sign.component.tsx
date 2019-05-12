import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { googleClientKey } from './../../../constants';
import { ISignComponentProps, ISignComponentMethod } from '../../../containers/main/sign/sign.container';

const MySwal = withReactContent(Swal);

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
    this.props.login({
      googleId: (response as IGoogleLoginSuccessPayload).googleId,
      googleIdToken: (response as IGoogleLoginSuccessPayload).tokenId,
      email: (response as IGoogleLoginSuccessPayload).profileObj.email,
      name: (response as IGoogleLoginSuccessPayload).profileObj.name
    });

  public errorToGoogle = (response: any) =>
    MySwal.fire({
      type: 'info',
      toast: true,
      position: 'top-right',
      title: 'Login Failure',
      text: response.error,
      timer: 2000,
      showConfirmButton: false
    });

  public render = () => (
    <>
      {this.props.loginStatus !== 'success' && (
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
