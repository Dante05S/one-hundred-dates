import { type IService } from 'interfaces/service.interface';
import { type Couple } from 'models/Couple.interface';
import Service from 'services';

interface ICoupleService extends IService<Couple> {}

export default class CoupleService
  extends Service<Couple>
  implements ICoupleService
{
  constructor() {
    super('couple');
  }
}
