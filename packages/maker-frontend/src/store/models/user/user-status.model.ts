import { Status } from 'store/models';

export interface UserLoaderStatus {
  loginStatus: Status;
  registerStatus: Status;
  getMyInfoStatus: Status;
}

export interface UserStatus {}
