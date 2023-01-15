export type SignInBody = {
  email: string;
  password: string;
};

export type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

export type SignOkResponse = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};
