import axios, { AxiosResponse, AxiosError } from 'axios';
import { IRegisterPayload, ILoginPayload } from '@src/store/actions';
import { ErrorResponse, HttpCommonResponse } from '@models';
import { urlChange } from '@src/lib';

interface SignUpResponse extends HttpCommonResponse {
  expiresIn: number;
  token: string;
}
export const register = (payload: IRegisterPayload): Promise<SignUpResponse> =>
  axios
    .post(urlChange('/api/sign/register/google'), payload, { headers: { 'Content-Type': 'application/json' } })
    .then((res: AxiosResponse<SignUpResponse>) => ({ ...res.data, error: false }))
    .catch((err: AxiosError) => ({
      expiresIn: 0,
      token: '',
      error: true,
      message: (err.response as AxiosResponse<ErrorResponse>).data.error.message,
      status: (err.response as AxiosResponse<ErrorResponse>).data.error.status
    }));

interface SignInResponse extends HttpCommonResponse {
  expiresIn: number;
  token: string;
}
export const login = (payload: ILoginPayload): Promise<SignInResponse> =>
  axios
    .post(urlChange('/api/sign/login/google'), payload, { headers: { 'Content-Type': 'application/json' } })
    .then((res: AxiosResponse<SignInResponse>) => ({ ...res.data, error: false }))
    .catch((err: AxiosError) => ({
      expiresIn: 0,
      token: '',
      error: true,
      message: (err.response as AxiosResponse<ErrorResponse>).data.error.message,
      status: (err.response as AxiosResponse<ErrorResponse>).data.error.status
    }));
