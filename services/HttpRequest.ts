/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Interfaces
import axios, { type AxiosResponse } from 'axios';
import { ResponseCode } from 'enums/response_code';
import { router } from 'expo-router';
import { responseIsOk } from 'helpers/request';
import { type Response } from 'interfaces/response.interface';
import { type UserRefresh } from 'models/User.interface';
import { type ResponseObjectData } from 'types/response_data.type';
import {
  deleteRefreshToken,
  deleteToken,
  getValueRefreshToken,
  getValueToken,
  save,
  saveRefresh
} from 'utils/secureStorage';

export default class HttpRequest {
  private endpoint: string;
  private params: string;
  private autoRedirect: boolean;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.params = '';
    this.autoRedirect = true;
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setParams(params: string): void {
    this.params = params;
  }

  public setAutoRedirect(autoRedirect: boolean): void {
    this.autoRedirect = autoRedirect;
  }

  buildUrl(id = ''): string {
    const endpoint = id !== '' ? `${this.endpoint}/${id}` : this.endpoint;
    const params = this.params !== '' ? `?${this.params}` : '';
    return `${process.env.EXPO_PUBLIC_API_URI ?? ''}/${endpoint}${params}`;
  }

  private async handleError<T>(
    err: unknown,
    isPublic: boolean,
    callback: () => Promise<Response<T>>
  ): Promise<Response<T>> {
    if (!axios.isAxiosError<Response<T>>(err)) {
      console.error(err);
      return {
        data: null,
        errors: [(err as Error).message],
        code: 500,
        message: (err as Error).message,
        success: false
      };
    }
    if (err.response !== undefined) {
      return await this.refresh(isPublic, err.response.data, callback);
    }
    if (err.request !== undefined) {
      console.error(err.request);
      return {
        data: null,
        errors: [JSON.stringify(err.request)],
        code: 500,
        message: JSON.stringify(err.request),
        success: false
      };
    }
    console.error(err.message);
    return {
      data: null,
      errors: [err.message],
      code: 500,
      message: err.message,
      success: false
    };
  }

  private async refresh<T>(
    isPublic: boolean,
    response: Response<T>,
    callback: () => Promise<Response<T>>
  ): Promise<Response<T>> {
    if (
      isPublic ||
      response.code !== ResponseCode.NOT_AUTHORIZED ||
      response.data === null ||
      typeof response.data !== 'object' ||
      !('type' in response.data) ||
      response.data.type !== 'expired'
    ) {
      if (
        !isPublic &&
        (response.code === ResponseCode.NOT_AUTHORIZED ||
          response.code === ResponseCode.SERVER_ERROR) &&
        response.data !== null &&
        typeof response.data === 'object' &&
        'type' in response.data &&
        response.data.type !== 'expired'
      ) {
        await Promise.all([deleteToken(), deleteRefreshToken()]);
        if (this.autoRedirect) {
          router.replace('/login');
        }
      }
      return response;
    }

    try {
      const refreshToken = await getValueRefreshToken();
      const responseRefresh = await axios.get<Response<UserRefresh>>(
        `${process.env.EXPO_PUBLIC_API_URI ?? ''}/auth/refresh`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );

      if (
        responseIsOk(responseRefresh.data.success, responseRefresh.data.data)
      ) {
        const tokens = responseRefresh.data.data as UserRefresh;
        await Promise.all([
          save(tokens.token),
          saveRefresh(tokens.refresh_token)
        ]);
        return await callback();
      }
      return response;
    } catch (error) {
      await Promise.all([deleteToken(), deleteRefreshToken()]);
      if (this.autoRedirect) {
        router.replace('/login');
      }
      return response;
    }
  }

  async get<T>(
    id: string | null = null,
    isPublic = false
  ): Promise<Response<T>> {
    const token = !isPublic ? await getValueToken() : '';
    try {
      let response: AxiosResponse<Response<T>>;
      if (id != null) {
        response = await axios.get(this.buildUrl(id), {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.get(this.buildUrl(''), {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== undefined ? `Bearer ${token}` : ''
          }
        });
      }
      return response.data;
    } catch (err) {
      return await this.handleError<T>(
        err,
        isPublic,
        async () => await this.get<T>(id, isPublic)
      );
    }
  }

  async post<T>(
    data: ResponseObjectData,
    isPublic = false
  ): Promise<Response<T>> {
    const token = !isPublic ? await getValueToken() : '';
    try {
      const response = await axios.post<Response<T>>(this.buildUrl(''), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      return await this.handleError<T>(
        err,
        isPublic,
        async () => await this.post<T>(data, isPublic)
      );
    }
  }

  async put<T>(
    id: string,
    data: ResponseObjectData,
    isPublic = false
  ): Promise<Response<T>> {
    const token = !isPublic ? await getValueToken() : '';
    try {
      const response = await axios.put<Response<T>>(this.buildUrl(id), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (err) {
      return await this.handleError<T>(
        err,
        isPublic,
        async () => await this.put<T>(id, data, isPublic)
      );
    }
  }

  async putNew<T>(
    data: ResponseObjectData,
    isPublic = false
  ): Promise<Response<T>> {
    const token = !isPublic ? await getValueToken() : '';
    try {
      const response = await axios.put<Response<T>>(this.buildUrl(''), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      return await this.handleError<T>(
        err,
        isPublic,
        async () => await this.putNew<T>(data, isPublic)
      );
    }
  }

  async delete<T>(
    id: string | null = null,
    isPublic = false
  ): Promise<Response<T>> {
    const token = !isPublic ? await getValueToken() : '';
    try {
      const response = await axios.delete<Response<T>>(
        this.buildUrl(id ?? ''),
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (err) {
      return await this.handleError<T>(
        err,
        isPublic,
        async () => await this.delete<T>(id, isPublic)
      );
    }
  }
}
