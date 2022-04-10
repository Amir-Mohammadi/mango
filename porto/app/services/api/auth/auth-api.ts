import { Api } from '../api';
import { ApiResponse } from '../api.type';
import { AuthenticationResult, RegisterModel } from './auth-api.type';

export class AuthApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async authenticate(
    phoneNumber: string,
  ): Promise<ApiResponse<AuthenticationResult>> {
    return this.api.post('/api/v1/users/authenticate', {
      responseClass: AuthenticationResult,
      data: {
        phone: phoneNumber,
      },
      isAnonymous: true,
    });
  }

  public async verifyAuthenticate(
    verificationCode: string,
    verificationToken: string,
  ): Promise<ApiResponse<AuthenticationResult>> {
    return this.api.post('/api/v1/users/verify-authenticate', {
      responseClass: AuthenticationResult,
      data: {
        verificationCode: verificationCode,
        verificationToken: verificationToken,
      },
      isAnonymous: true,
    });
  }

  public async register(
    register: RegisterModel,
  ): Promise<ApiResponse<AuthenticationResult>> {
    return this.api.post('/api/v1/users/register', {
      responseClass: AuthenticationResult,
      data: register,
      isAnonymous: true,
    });
  }
}
