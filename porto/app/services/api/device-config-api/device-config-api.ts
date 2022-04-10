import * as Apisauce from 'apisauce';
import { plainToInstance } from 'class-transformer';
import { DEVICE_API_CONFIG } from '../api-config';
import { ApiResponse, getGeneralApiProblem } from '../api.type';
import { DeviceWifi } from './device-config-api.type';

export class DeviceConfigApi {
  private api: Apisauce.ApisauceInstance;

  constructor() {
    this.api = Apisauce.create({
      baseURL: DEVICE_API_CONFIG.url,
      timeout: DEVICE_API_CONFIG.timeout,
      headers: { Accept: 'application/json' },
    });
  }

  public async getDeviceWifiList(): Promise<ApiResponse<Array<DeviceWifi>>> {
    try {
      const response: Apisauce.ApiResponse<Array<DeviceWifi>> =
        await this.api.get(`/wifi_list`, {});

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const deviceWifiListResult = plainToInstance(
        DeviceWifi,
        response.data ?? [],
      );

      return { kind: 'ok', data: deviceWifiListResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async setDeviceRouter(
    ssid: string,
    pass: string,
    pairKey: string,
  ): Promise<ApiResponse<boolean>> {
    try {
      let result = false;
      const response: Apisauce.ApiResponse<boolean> = await this.api.post(
        `/wifi_connect`,
        { ssid: ssid, pass: pass, pairKey: pairKey },
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
        result = false;
      } else {
        result = true;
      }

      return { kind: 'ok', data: result };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async sendCredential(
    data: DeviceCredential,
  ): Promise<ApiResponse<boolean>> {
    try {
      let result = false;
      const response: Apisauce.ApiResponse<boolean> = await this.api.post(
        `/wifi_connect`,
        data,
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
        result = false;
      } else {
        result = true;
      }

      return { kind: 'ok', data: result };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }
}

interface DeviceCredential {
  ssid: string;
  password: string;
  pairKey: string;
  ownerKey: string;
  accessToken: string;
}

