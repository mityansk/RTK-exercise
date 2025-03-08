export interface IUserSignInData {
  email: string;
  password: string;
}

export interface IUserSignUpData extends IUserSignInData {
  userName: string;
}

export interface IUser {
  id: number;
  email: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponseData {
  user: IUser;
  accessToken: string;
}
