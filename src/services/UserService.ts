import { type Response } from 'interfaces/response.interface';
import { type IService } from 'interfaces/service.interface';
import {
  type UserCouple,
  type CoupleCode,
  type User
} from 'models/User.interface';
import Service from 'services';

interface IUserService extends IService<User> {
  generateCoupleCode: () => Promise<Response<CoupleCode>>;
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

  async generateCoupleCode(): Promise<Response<CoupleCode>> {
    this.setEndpoint('/user/generate-couple-code');
    const response: Response<CoupleCode> = await this.get();
    return response;
  }
}
