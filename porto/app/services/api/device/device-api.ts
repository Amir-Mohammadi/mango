import * as Apisauce from 'apisauce';
import { plainToInstance } from 'class-transformer';
import { DeviceConnectionPairKeyResult } from '.';
import { AuthenticationResult } from '..';
import { deviceProfileMock } from '../../../utils/mock/device-mock';
import { sleep } from '../../../utils/sleep';
import { Storage } from '../../../utils/storage';
import { TOKEN_STORAGE_KEY } from '../../../utils/token/token-manager';
import { Api } from '../api';
import { ApiResponse, getGeneralApiProblem } from '../api.type';
import { DeviceProfile, DeviceResult, EditDevice } from './device-api.type';
export class DeviceApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async getDevices(
    assetId: string,
    zone?: string | null,
  ): Promise<ApiResponse<Array<DeviceResult>>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);
      const response: Apisauce.ApiResponse<Array<DeviceResult>> =
        await this.api.apisauce.get(
          `/api/v1/assets/${assetId}/devices?zone=${zone == null ? '' : zone}`,
          {},
          { headers: { Authorization: 'Bearer ' + token } },
        );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const deviceListResult = plainToInstance(DeviceResult, response.data ?? []);

      return { kind: 'ok', data: deviceListResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async getDevice(
    assetId: string,
    deviceId: string,
  ): Promise<ApiResponse<DeviceResult>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);

      const response: Apisauce.ApiResponse<DeviceResult> =
        await this.api.apisauce.get(
          `/api/v1/assets/${assetId}/devices/${deviceId}`,
          {},
          { headers: { Authorization: 'Bearer ' + token } },
        );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const deviceResult = plainToInstance(DeviceResult, response.data);

      return { kind: 'ok', data: deviceResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async getDeviceUserToken(
    assetId: string,
    deviceId?: string,
  ): Promise<ApiResponse<AuthenticationResult>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);
      const response: Apisauce.ApiResponse<AuthenticationResult> =
        await this.api.apisauce.get(
          `/api/v1/assets/${assetId}/devices/${deviceId}/user-token`,
          {},
          { headers: { Authorization: 'Bearer ' + token } },
        );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const authenticationResult = plainToInstance(
        AuthenticationResult,
        response.data,
      );

      return { kind: 'ok', data: authenticationResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async getDeviceProfiles(): Promise<ApiResponse<Array<DeviceProfile>>> {
    await sleep(2000);
    const deviceProfiles = deviceProfileMock;
    return {
      kind: 'ok',
      data: deviceProfiles.map(item => {
        return {
          id: item.id,
          profileImage: item.profileImage,
          profileName: item.profileName,
          profileRegex: item.profileRegex,
        };
      }),
    };
  }

  public async rpc(
    assetId: string,
    deviceId: string,
    method: string,
    value: boolean,
  ): Promise<ApiResponse<boolean>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);
      const response: Apisauce.ApiResponse<any> = await this.api.apisauce.post(
        `/api/v1/assets/${assetId}/devices/${deviceId}/rpc`,
        {
          method: method,
          params: value,
          timeout: 2000,
          persistent: false,
        },
        { headers: { Authorization: 'Bearer ' + token } },
      );

      let result = true;
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
        result = false;
      }

      return { kind: 'ok', data: result };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async editDeviceName(
    assetId: string,
    deviceId: string,
    editDevice: EditDevice,
  ): Promise<ApiResponse<boolean>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);

      const response: Apisauce.ApiResponse<any> = await this.api.apisauce.put(
        `/api/v1/assets/${assetId}/devices/${deviceId}`,
        editDevice,
        { headers: { Authorization: 'Bearer ' + token } },
      );

      let result = true;

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
        result = false;
      }

      return { kind: 'ok', data: result };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async getDeviceConnectionPairKey(
    deviceName: string,
  ): Promise<ApiResponse<DeviceConnectionPairKeyResult>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);

      const response: Apisauce.ApiResponse<any> = await this.api.apisauce.get(
        `/api/v1/devices/${deviceName}/connection-pairKey`,
        {},
        { headers: { Authorization: 'Bearer ' + token } },
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      const deviceConnectionStatusResult = plainToInstance(
        DeviceConnectionPairKeyResult,
        response.data,
      );

      return { kind: 'ok', data: deviceConnectionStatusResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }
}
