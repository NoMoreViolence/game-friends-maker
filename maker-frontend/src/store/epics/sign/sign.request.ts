import axios, { AxiosResponse } from 'axios';
import { ILoginPayload } from '@src/store/actions';
import { urlChange } from '@src/lib';

interface SignUpResponse {
  expiresIn: number;
  message: string;
  token: string;
}
const signUp = (payload: ILoginPayload): Promise<SignUpResponse> => {
  console.log(payload);
  console.log(urlChange('/api/sign/register/google'));
  return axios
    .post(urlChange('/api/sign/register/google'), payload, { headers: { 'Content-Type': 'application/json' } })
    .then((res: AxiosResponse<SignUpResponse>) => res.data);
};

const signIn = () => {};

export { signUp, signIn };
