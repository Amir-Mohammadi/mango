import * as Apisauce from 'apisauce';
import { AxiosRequestConfig, Method } from 'axios';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TokenManager } from '../../utils/token/token-manager';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { ApiResponse, getGeneralApiProblem } from './api.type';

interface ApiRequestOptions<T> {
  responseClass: ClassConstructor<T> | null;
  data?: any;
  isAnonymous?: boolean;
  axiosConfig?: AxiosRequestConfig;
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: Apisauce.ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  public post<T = undefined>(
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    return this.transport('POST', url, options);
  }

  public delete<T = undefined>(
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    return this.transport('DELETE', url, options);
  }

  public patch<T = undefined>(
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    return this.transport('PATCH', url, options);
  }

  public put<T = undefined>(
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    return this.transport('PUT', url, options);
  }

  public get<T = undefined>(
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    return this.transport('GET', url, options);
  }

  private async transport<T = undefined>(
    method: Method,
    url: string,
    options: ApiRequestOptions<T>,
  ): Promise<ApiResponse<T>> {
    const { responseClass = null, isAnonymous = false } = options;

    try {
      // adjust the authorize header here
      let tokenHeader = {};
      if (!isAnonymous) {
        const token = await TokenManager.get();

        if (token !== null)
          tokenHeader = {
            Authorization: 'Bearer ' + token,
          };
      }

      const response = await this.apisauce.any<T>({
        method: method,
        url: url,
        data: options.data,
        headers: tokenHeader,
        ...options.axiosConfig,
      });

      // the typical ways to die when calling an api
      if (!response.ok) {
        console.error('api error!:', response);

        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      // validate and transform the data
      if (responseClass && !response.data) {
        throw new Error('class provided but data is empty');
      }

      let result: undefined | T;
      if (responseClass === null) {
        result = undefined;
      } else {
        result = plainToInstance(responseClass, response.data);
      }

      return { kind: 'ok', data: result as T };
    } catch (error) {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup(): void {
    // construct the apisauce instance
    this.apisauce = Apisauce.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }
}

