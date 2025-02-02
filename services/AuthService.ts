import { type Response } from 'interfaces/response.interface';
import { type IService } from 'interfaces/service.interface';
import {
  type User,
  type RegisterUser,
  type TokenUser,
  type LoginUser,
  type CodeVerifyUser
} from 'models/User.interface';
import Service from 'services';

interface IAuthService extends IService<User> {
  register: (data: RegisterUser) => Promise<Response<User>>;
  login: (data: LoginUser) => Promise<Response<User>>;
  validateCode: (data: CodeVerifyUser) => Promise<Response<TokenUser>>;
  resendCode: (email: string) => Promise<Response<null>>;
}

export default class AuthService extends Service<User> implements IAuthService {
  constructor() {
    super('auth');
  }

  async register(data: RegisterUser): Promise<Response<User>> {
    this.setEndpoint('auth/register');
    const response: Response<User> = await this.post({ ...data }, true);
    return response;
  }

  async login(data: LoginUser): Promise<Response<User>> {
    this.setEndpoint('auth/login');
    const response: Response<User> = await this.post({ ...data }, true);
    return response;
  }

  async validateCode(data: CodeVerifyUser): Promise<Response<TokenUser>> {
    this.setEndpoint('auth/validate-code');
    const response: Response<TokenUser> = await this.post({ ...data }, true);
    return response;
  }

  async resendCode(email: string): Promise<Response<null>> {
    this.setEndpoint('/auth/resend-code');
    const response: Response<null> = await this.post({ email }, true);
    return response;
  }
}
