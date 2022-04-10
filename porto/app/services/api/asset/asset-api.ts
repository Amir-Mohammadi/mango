import * as Apisauce from 'apisauce';
import { plainToInstance } from 'class-transformer';
import { DeleteAsset, EditAsset, ShareAssetInput } from '.';
import { Storage } from '../../../utils/storage';
import { TOKEN_STORAGE_KEY } from '../../../utils/token/token-manager';
import { Api } from '../api';
import { ApiResponse, getGeneralApiProblem } from '../api.type';
import {
  AddAsset,
  AssetResult,
  AssetVerify,
  ShareAssetResult,
  VoidResult,
} from './asset-api.type';

export class AssetApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async share(
    assetInput: ShareAssetInput,
  ): Promise<ApiResponse<ShareAssetResult>> {
    const response = await this.api.post(
      `/api/v1/assets/${assetInput.id}/share`,
      {
        responseClass: ShareAssetResult,
        data: assetInput,
      },
    );
    return response;
  }

  public async verifyShare(
    assetVerify: AssetVerify,
  ): Promise<ApiResponse<VoidResult>> {
    const response = await this.api.post('/api/v1/assets/verify-share', {
      responseClass: VoidResult,
      data: assetVerify,
    });

    return response;
  }

  public async transferOwner(
    assetId: string,
    deviceMacAddress: string,
  ): Promise<ApiResponse<void>> {
    const response = await this.api.post(
      `/api/v1/assets/${assetId}/devices/${deviceMacAddress}/change-owner`,
      {
        responseClass: null,
        axiosConfig: { timeout: 15000 },
      },
    );
    console.log(response);

    return response;
  }

  public async getAssets(): Promise<ApiResponse<Array<AssetResult>>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);
      const response: Apisauce.ApiResponse<Array<AssetResult>> =
        await this.api.apisauce.get(
          `/api/v1/assets/`,
          {},
          { headers: { Authorization: 'Bearer ' + token } },
        );

     

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const assetListResult = plainToInstance(AssetResult, response.data ?? []);

      return { kind: 'ok', data: assetListResult };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }

  public async editAsset(
    editAsset: EditAsset,
  ): Promise<ApiResponse<AssetResult>> {
    const response = await this.api.put(`/api/v1/assets/${editAsset.id}`, {
      responseClass: AssetResult,
      data: editAsset,
    });

    return response;
  }

  public async deleteAsset(
    deleteAsset: DeleteAsset,
  ): Promise<ApiResponse<VoidResult>> {
    const response = await this.api.delete(`/api/v1/assets/${deleteAsset.id}`, {
      responseClass: VoidResult,
      data: deleteAsset,
    });

    return response;
  }

  public async addAsset(addAsset: AddAsset): Promise<ApiResponse<AssetResult>> {
    const response = await this.api.post('/api/v1/assets', {
      responseClass: AssetResult,
      data: addAsset,
    });

    return response;
  }
}

