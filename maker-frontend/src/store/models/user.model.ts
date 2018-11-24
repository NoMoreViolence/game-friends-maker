interface User {
  email: string;
  name: string;
  admin: boolean;
  loginPending: boolean;
  loginSuccess: boolean;
}

export { User };
