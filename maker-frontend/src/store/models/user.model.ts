interface User {
  email: string;
  username: string;
  admin: boolean;
  token: string;
  loginStatus: 'none' | 'success' | 'pending';
  registerStatus: 'none' | 'success' | 'pending';
}

export { User };
