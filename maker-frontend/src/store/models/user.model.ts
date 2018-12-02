interface User {
  email: string;
  username: string;
  admin: boolean;
  loginPending: boolean;
  loginSuccess: boolean;
}

export { User };
