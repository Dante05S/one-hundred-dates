export interface User {
  name: string;
  email: string;
  email_verification: boolean;
}

export type FormUser = Pick<User, 'name' | 'email'>;

export interface RegisterUser extends FormUser {
  password: string;
}

export interface CodeVerifyUser {
  email: string;
  code_token: string;
}

export interface TokenUser {
  user: User;
  token: string;
}

export interface CoupleCode {
  temp_couple_code: string;
}
export type LoginUser = Pick<RegisterUser, 'email' | 'password'>;
export type EmailUser = Pick<User, 'email'>;
export type TokenSessionUser = Pick<TokenUser, 'token'>;
