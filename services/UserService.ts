import { type Response } from 'interfaces/response.interface';
import { type IService } from 'interfaces/service.interface';
import {
  type UserCouple,
  type CodeCouple,
  type User
} from 'models/User.interface';
import Service from 'services';

interface IUserService extends IService<User> {
  generateCoupleCode: () => Promise<Response<CodeCouple>>;
  getUser: () => Promise<Response<UserCouple>>;
}

export default class UserService extends Service<User> implements IUserService {
  constructor() {
    super('user');
  }

  async getUser(): Promise<Response<UserCouple>> {
    const response: Response<UserCouple> = await this.get();
    return response;
  }

  async generateCoupleCode(): Promise<Response<CodeCouple>> {
    this.setEndpoint('/user/generate-couple-code');
    const response: Response<CodeCouple> = await this.get();
    return response;
  }
}
