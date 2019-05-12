import { Status } from './common.model';

export interface User {
  email: string;
  token: string;
  expiresIn: number;
  loginStatus: Status;
}
