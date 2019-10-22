import { GoogleTokenPayload } from '@models';

export interface RegisterPayload extends GoogleTokenPayload {}
export interface RegisterSuccessPayload {
  token: string;
}

export interface LoginPayload extends GoogleTokenPayload {}
export interface LoginSuccessPayload {
  token: string;
}

export interface GetMyInfoPayload {
  token: string;
}
export interface GetMyInfoSuccessPayload {
  value: {
    name: string;
    email: string;
  };
}
