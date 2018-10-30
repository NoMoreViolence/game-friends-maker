interface SignInSuccessModel {
  admin: boolean;
  username: string;
  email: string;
}

interface SignUpSuccessModel {
  username: string;
  email: string;
}

export { SignInSuccessModel, SignUpSuccessModel };
