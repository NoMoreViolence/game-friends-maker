import { AxiosRequests } from '@lib';
import { HttpError, HttpStatus } from '@marblejs/core';
import { checkEmail, checkPassword, checkSameValue } from '@utils';
import Axios from 'axios';

interface IGoogleTokenResponse {
  name: string;
  email: string;
  sub?: string;
  googleId?: string;
}

export const checkGoogleIdVaildation = async ({
  googleIdToken
}: {
  googleIdToken: string;
}): Promise<IGoogleTokenResponse> => {
  try {
    const axiosInstance = new AxiosRequests(Axios);

    const response = await axiosInstance.axiosGetRequest({
      url: 'https://oauth2.googleapis.com/tokeninfo',
      config: {
        params: {
          id_token: googleIdToken
        },
        headers: {}
      }
    });

    return response.data as IGoogleTokenResponse;
  } catch (e) {
    throw new HttpError('Wrong google Id', HttpStatus.UNAUTHORIZED);
  }
};

export const checkRegisterVaildation = ({ email }: { email: string }): void => {
  checkEmail(email);
};

export const checkSameValueVaildation = (
  googleResponse: IGoogleTokenResponse,
  requestBody: IGoogleTokenResponse
): void => {
  checkSameValue(googleResponse.email, requestBody.email);
  checkSameValue(googleResponse.name, requestBody.name);
  checkSameValue(googleResponse.sub, requestBody.googleId);
};

export const checkLoginVaildation = ({ email, password }: { email: string; password: string }): void => {
  checkEmail(email);
  checkPassword(password);
};
