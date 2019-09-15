import { AxiosResponse } from 'axios';
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonpAdapter = require('axios-jsonp');
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
  axios({
    url: `${mailChimpUrl}&EMAIL=${payload.email}`,
    adapter: jsonpAdapter,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res: AxiosResponse<EmailSubscribeResponse>) => res.data);
