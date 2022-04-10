import { DeleteResult, UserProfileEdit, UserProfileResult } from '.';
import { Api } from '../api';
import { ApiResponse } from '../api.type';
import { AuthenticationResult } from '../auth';

export class UserApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async getUserProfile(): Promise<ApiResponse<UserProfileResult>> {
    return this.api.get('/api/v1/users/me/profile', {
      responseClass: UserProfileResult,
    });
  }
  public async editUserProfile(
    userProfileEdit: UserProfileEdit,
  ): Promise<ApiResponse<UserProfileResult>> {
    return this.api.put('/api/v1/users/me/profile', {
      responseClass: UserProfileResult,
      data: userProfileEdit,
    });
  }

  public async editUserProfilePhone(
    phone: string,
  ): Promise<ApiResponse<AuthenticationResult>> {
    return this.api.put('/api/v1/users/me/change-phone', {
      responseClass: AuthenticationResult,
      data: {
        phone: phone,
      },
    });
  }

  public async verifyUserProfilePhone(
    verificationCode: string,
    verificationToken: string,
  ): Promise<ApiResponse<AuthenticationResult>> {
    return this.api.post('/api/v1/users/me/change-phone-verify', {
      responseClass: AuthenticationResult,
      data: {
        verificationCode: verificationCode,
        verificationToken: verificationToken,
      },
    });
  }

  // public async getMembers(
  //   members: MembersInputs,
  // ): Promise<ApiResponse<Array<MembersResult>>> {
  //   const response = this.api.put(`/api/customers?${members.pageSize}${members.page}`, {
  //     responseClass: Array<MembersResult>,
  //     data: members,
  //   });
  // }

  public async deleteUser(): Promise<void> {
    const response = this.api.delete(`/api/users/me`, {
      responseClass: DeleteResult,
    });
  }
}
