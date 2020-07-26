import { CONSTANTS } from 'env';
import React, { FC } from 'react';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { Button } from 'ui/Components';

function instanceOfGoogleLoginResponse(object: any): object is GoogleLoginResponse {
  return 'profileObj' in object;
}

export const LoginForm: FC = () => {
  const { signIn } = useGoogleLogin({
    clientId: CONSTANTS.GOOGLE_CLIENT_ID,
    onSuccess(response) {
      if (instanceOfGoogleLoginResponse(response)) {
        //
      } else {
        //
      }
    },
    onFailure(response) {},
  });

  return (
    <Button onClick={signIn} rightIconName="googlelogo" size="L" text="Start With Google" buttonType="primary-light" />
  );
};
