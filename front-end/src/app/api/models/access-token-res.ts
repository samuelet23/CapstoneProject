/* tslint:disable */
/* eslint-disable */
export interface AccessTokenRes {
  accessToken: string;
  user: UserToken

}

export interface UserToken{
  dateOfBirth?: string;
  name?: string;
  role?: string;
  surname?: string;
  username?: string;
}
