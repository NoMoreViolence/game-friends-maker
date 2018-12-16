interface User {
  email: string;
  username: string;
  admin: boolean;
  loginPending: boolean;
  loginSuccess: boolean;
  registerPending: boolean;
  registerSuccess: boolean;
}

export { User };
