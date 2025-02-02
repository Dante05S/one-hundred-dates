import { type Couple } from './Couple.interface';

export interface User {
  id: string;
  name: string;
  email: string;
  type_couple: 'a' | 'b' | null;
}

export interface UserCouple extends User {
  couple: Couple | null;
}

export interface CodeCouple {
  temp_couple_code: string;
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
  codeToken: string;
}

export interface TokenUser {
  user: UserCouple;
  token: string;
  refresh_token: string;
}

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>;
export type EmailUser = Pick<User, 'email'>;
export type TokenSessionUser = Pick<TokenUser, 'token'>;
