import HttpRequest from './HttpRequest';
import { type Response } from 'interfaces/response.interface';
import { type IService } from 'interfaces/service.interface';
import { type ResponseObjectData } from 'types/response_data.type';

export default class Service<T> extends HttpRequest implements IService<T> {
  async getAll(isPublic = false): Promise<Response<T[]>> {
    const response: Response<T[]> = await this.get<T[]>(null, isPublic);
    return response;
  }

  async getById(id: string, isPublic = false): Promise<Response<T>> {
    const response: Response<T> = await this.get<T>(id, isPublic);
    return response;
  }

  async getOne(isPublic = false): Promise<Response<T>> {
    const response: Response<T> = await this.get<T>(null, isPublic);
    return response;
  }

  async create(
    data: ResponseObjectData,
    isPublic = false
  ): Promise<Response<T>> {
    const response: Response<T> = await this.post<T>(data, isPublic);
    return response;
  }

  async update(
    id: string,
    data: ResponseObjectData,
    isPublic = false
  ): Promise<Response<T>> {
    const response: Response<T> = await this.put<T>(id, data, isPublic);
    return response;
  }

  async remove(id: string, isPublic = false): Promise<Response<T>> {
    const response: Response<T> = await this.delete<T>(id, isPublic);
    return response;
  }
}
