/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Interfaces
import axios, { type AxiosResponse } from 'axios';
import { type Response } from 'interfaces/response.interface';
import { type ResponseObjectData } from 'types/response_data.type';

export default class HttpRequest {
  private endpoint: string;
  private params: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.params = '';
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  setParams(params: string): void {
    this.params = params;
  }

  buildUrl(id = ''): string {
    const endpoint = id !== '' ? `${this.endpoint}/${id}` : this.endpoint;
    const params = this.params !== '' ? `?${this.params}` : '';
    return `${process.env.EXPO_PUBLIC_API_URI ?? ''}/${endpoint}${params}`;
  }

  private handleError<T>(err: unknown): Response<T> {
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
      return err.response.data;
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

  async get<T>(
    id: string | null = null,
    isPublic = false,
    token?: string
  ): Promise<Response<T>> {
    try {
      let response: AxiosResponse<Response<T>>;
      if (id != null) {
        response = await axios.get(this.buildUrl(id), {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== undefined ? `Bearer ${token}` : ''
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
      return this.handleError(err);
    }
  }

  async post<T>(
    data: ResponseObjectData,
    isPublic = false,
    token?: string
  ): Promise<Response<T>> {
    try {
      const response = await axios.post<Response<T>>(this.buildUrl(''), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== undefined ? `Bearer ${token}` : ''
        }
      });

      return response.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async put<T>(
    id: string,
    data: ResponseObjectData,
    isPublic = false,
    token?: string
  ): Promise<Response<T>> {
    try {
      const response = await axios.put<Response<T>>(this.buildUrl(id), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== undefined ? `Bearer ${token}` : ''
        }
      });

      return response.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async putNew<T>(
    data: ResponseObjectData,
    isPublic = false,
    token?: string
  ): Promise<Response<T>> {
    try {
      const response = await axios.put<Response<T>>(this.buildUrl(''), data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': isPublic
            ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
            : '',
          Authorization: token !== undefined ? `Bearer ${token}` : ''
        }
      });
      return response.data;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async delete<T>(
    id: string | null = null,
    isPublic = false,
    token?: string
  ): Promise<Response<T>> {
    try {
      const response = await axios.delete<Response<T>>(
        this.buildUrl(id ?? ''),
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': isPublic
              ? process.env.EXPO_PUBLIC_FRONT_API_KEY ?? ''
              : '',
            Authorization: token !== undefined ? `Bearer ${token}` : ''
          }
        }
      );
      return response.data;
    } catch (err) {
      return this.handleError(err);
    }
  }
}
