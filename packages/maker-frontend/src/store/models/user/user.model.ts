import { UserInfo, UserLoaderStatus, UserStatus } from 'store/models';

export interface User {
  userInfo: UserInfo;
  userLoaderStatus: UserLoaderStatus;
  userStatus: UserStatus;
}
