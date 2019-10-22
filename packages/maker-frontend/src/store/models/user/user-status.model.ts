import { Status } from '@models';

export interface UserLoaderStatus {
  loginStatus: Status;
  registerStatus: Status;
  getMyInfoStatus: Status;
}

export interface UserStatus {}
