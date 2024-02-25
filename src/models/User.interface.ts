export interface User {
  name: string;
  email: string;
  type_couple: 'a' | 'b' | null;
}

export interface UserCouple extends User {
  couple: CoupleCode | null;
}

export type FormUser = Pick<User, 'name' | 'email'>;

export interface RegisterUser extends FormUser {
  password: string;
}

export interface UserRefresh {
  token: string;
  refresh_token: string;
}

export interface CodeVerifyUser {
  email: string;
  code_token: string;
}

export interface TokenUser {
  user: UserCouple;
  token: string;
  refresh_token: string;
}

export interface CoupleCode {
  temp_couple_code: string;
}
export type LoginUser = Pick<RegisterUser, 'email' | 'password'>;
export type EmailUser = Pick<User, 'email'>;
export type TokenSessionUser = Pick<TokenUser, 'token'>;
