import { TokenType } from "./TokenType";

export interface IAuthenticationResult {
  token: string;
  refreshToken: string;
  tokenType: TokenType;
}
