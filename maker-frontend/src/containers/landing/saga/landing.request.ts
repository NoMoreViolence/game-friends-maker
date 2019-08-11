import { AxiosResponse } from 'axios';
import { detectEnvironment } from '@constants';
import { RegisterPayload, LoginPayload, GetMyInfoPayload, GetMyInfoSuccessPayload } from '@actions';

const axios = detectEnvironment();

interface RegisterResponse {
  expiresIn: number;
  token: string;
  message: string;
  status: number;
}
export const registerRequest = (payload: RegisterPayload): Promise<RegisterResponse> =>
  axios
    .post('/api/sign/up/google', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<RegisterResponse>) => res.data);

interface LoginResponse {
  expiresIn: number;
  token: string;
  message: string;
  status: number;
}
export const loginRequest = (payload: LoginPayload): Promise<LoginResponse> =>
  axios
    .post('/api/sign/in/google', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: AxiosResponse<LoginResponse>) => res.data);

interface GetMyInfoResponse extends GetMyInfoSuccessPayload {
  message: string;
  status: number;
}
export const getMyInfoRequest = (payload: GetMyInfoPayload): Promise<GetMyInfoResponse> =>
  axios
    .get('/api/sign/check', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then((res: AxiosResponse<GetMyInfoResponse>) => res.data);
