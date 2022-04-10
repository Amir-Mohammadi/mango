import * as Apisauce from 'apisauce';
import { Storage } from '../../../utils/storage';
import { TOKEN_STORAGE_KEY } from '../../../utils/token/token-manager';
import { Api } from '../api';
import { ApiResponse, getGeneralApiProblem } from '../api.type';

export class FilesApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async uploadFileToSession(
    formData: FormData,
  ): Promise<ApiResponse<string[]>> {
    try {
      const token = await Storage.loadString(TOKEN_STORAGE_KEY);
      const response: Apisauce.ApiResponse<Array<string>> =
        await this.api.apisauce.post(`/api/v1/files/upload`, formData, {
          headers: { Authorization: 'Bearer ' + token },
        });

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      return { kind: 'ok', data: response.data! };
    } catch (e: any) {
      __DEV__ && console.tron?.log?.(e.message);
      return { kind: 'bad-data' };
    }
  }
}
