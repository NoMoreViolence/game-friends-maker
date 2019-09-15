import newAxios, { AxiosResponse, AxiosError } from 'axios';
import { detectEnvironment, mailChimpUrl } from '@constants';
import { HttpCommonResponse } from '@models';
import {
  RegisterPayload,
  LoginPayload,
  GetMyInfoPayload,
  GetMyInfoSuccessPayload,
  EmailSubscribePayload,
} from '@actions';

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
    .then((res: AxiosResponse<RegisterResponse>) => res.data);

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
    .then((res: AxiosResponse<LoginResponse>) => res.data);

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
    .then((res: AxiosResponse<GetMyInfoResponse>) => res.data);

interface EmailSubscribeResponse extends HttpCommonResponse {
  result: 'error' | 'success';
  msg: string;
}
export const emailSubscribeRequest = (payload: EmailSubscribePayload): Promise<EmailSubscribeResponse> =>
  newAxios
    .get(`${mailChimpUrl}&EMAIL=${payload.email}&`, {
      data: {},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded charset=utf-8',
      },
    })
    .then((res: AxiosResponse<EmailSubscribeResponse>) => res.data)
    .catch((e: AxiosError<EmailSubscribeResponse>) => {
      if (e.response) {
        return { ...e.response.data, message: '', status: 500 };
      }
      return { result: 'error', msg: '', message: '', status: 500 };
    });
