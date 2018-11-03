interface SignInSuccessModel {
  message: string;
  success: boolean;
  value: {
    admin: boolean;
    username: string;
    email: string;
  };
}

interface SignUpSuccessModel {
  username: string;
  email: string;
}

export { SignInSuccessModel, SignUpSuccessModel };
