export class AuthenticationResult {
  constructor() {
    this.token = '';
    this.refreshToken = '';
    this.tokenType = TokenType.Verify;
  }

  token: string;
  refreshToken: string;
  tokenType: TokenType;
}

export interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  registerToken: string;
}
export enum TokenType {
  Verify = 0,
  Register = 1,
  Auth = 2,
  Sharing = 3,
  DeviceUserToken = 4,
  ChangePhone = 5,
}
