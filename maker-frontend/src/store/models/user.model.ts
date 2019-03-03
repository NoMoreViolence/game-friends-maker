interface User {
  email: string;
  admin: boolean;
  token: string;
  loginStatus: 'none' | 'success' | 'pending' | 'error';
  autoLoginStatus: 'none' | 'success' | 'pending' | 'error';
  registerStatus: 'none' | 'success' | 'pending' | 'error';
}

export { User };
