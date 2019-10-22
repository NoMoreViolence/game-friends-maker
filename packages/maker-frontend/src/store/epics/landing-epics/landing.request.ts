import { AxiosResponse, AxiosError } from 'axios';
import { detectEnvironment } from '@constants';
import { HttpCommonResponse } from '@models';
import { RegisterPayload, LoginPayload, GetMyInfoPayload, GetMyInfoSuccessPayload } from '@src/store/payloads';
import { getErrorResponse } from '@utils';

const axios = detectEnvironment();

interface RegisterResponse extends HttpCommonResponse {
  token: string;
}
export const registerRequest = (payload: RegisterPayload): Promise<RegisterResponse> =>
  axios
    .post('/api/sign/up/google', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<RegisterResponse>) => res.data)
    .catch((err: AxiosError<HttpCommonResponse>) => ({
      ...getErrorResponse(err),
      token: '',
    }));

interface LoginResponse extends HttpCommonResponse {
  token: string;
}
export const loginRequest = (payload: LoginPayload): Promise<LoginResponse> =>
  axios
    .post('/api/sign/in/google', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<LoginResponse>) => res.data)
    .catch((err: AxiosError<HttpCommonResponse>) => ({
      ...getErrorResponse(err),
      token: '',
    }));

interface GetMyInfoResponse extends GetMyInfoSuccessPayload, HttpCommonResponse {}
export const getMyInfoRequest = (payload: GetMyInfoPayload): Promise<GetMyInfoResponse> =>
  axios
    .get('/api/sign/check', {
      data: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then((res: AxiosResponse<GetMyInfoResponse>) => res.data)
    .catch((err: AxiosError<HttpCommonResponse>) => ({
      ...getErrorResponse(err),
      value: {
        name: '',
        email: '',
      },
    }));
