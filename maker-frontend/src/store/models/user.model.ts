import { Status } from './common.model';

export interface User {
  email: string;
  name: string;
  token: string;
  expiresIn: number;
  loginStatus: Status;
  registerStatus: Status;
  getMyInfoStatus: Status;
}
