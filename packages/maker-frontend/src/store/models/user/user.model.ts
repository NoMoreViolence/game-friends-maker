import { UserInfo, UserLoaderStatus, UserStatus } from '@models';

export interface User {
  userInfo: UserInfo;
  userLoaderStatus: UserLoaderStatus;
  userStatus: UserStatus;
}
