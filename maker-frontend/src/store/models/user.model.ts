interface User {
  email: string;
  username: string;
  admin: boolean;
  loginStatus: 'none' | 'success' | 'pending';
  registerStatus: 'none' | 'success' | 'pending';
}

export { User };
