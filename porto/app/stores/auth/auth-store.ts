import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AuthApi, AuthenticationResult, TokenType } from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { enumerate } from '../../utils/enumeration';
import { TokenManager } from '../../utils/token/token-manager';
import { withEnvironment } from '../extensions/with-environment';
export const AuthStoreModel = types
  .model('AuthStore')
  .props({
    /**
     * is user already logged in
     */
    isLoggedIn: types.optional(types.boolean, false),
    sliderVersion: types.maybe(types.number), // TODO move to app state store
    /**
     * after sending the verification code, we enable this flag
     */
    // isWaitingForCodeVerification: types.optional(types.boolean, true),
    /**
     * exact time of code sent, we are going to use thing to enable the resend button
     * and show the timer to user
     */
    verificationCodeRequestedTime: types.optional(types.number, 0),
    /**
     * token, its better to move this property to secret database
     * and only use the isLoggedIn flag
     */
    token: types.optional(types.string, ''),
    /**
     * after requesting code verification, this will be the phone number
     * that code has sent to
     */
    userPhoneNumber: types.maybe(types.string),
    /**
     * this indicate the receive token is which type
     */
    tokenType: types.optional(
      enumerate<TokenType>('tokenType', Object.values(TokenType)),
      TokenType.Auth,
    ),

    /**
     * this indicate which step is valid in this moment
     */
    isRequiredRegister: types.optional(types.boolean, false),

    /**
     * after sending the verification code, we enable this flag
     */
    isWaitingForCodeVerification: types.optional(types.boolean, false),

    /**
     * this indicate that which time code sended to client
     */
    verificationCodeReceiveTime: types.optional(types.number, Date.now()),
  })
  .volatile(() => ({
    /**
     * only for the promise type actions, this flag going to be true middle of the process
     */
    isLoading: false,
  }))
  .extend(withEnvironment)
  .actions(self => ({
    /**
     * this action will reset all the state related to the
     * two step verification
     */
    resetCodeVerificationStates: (): void => {
      self.isLoggedIn = false;
      self.isLoading = false;
      self.isRequiredRegister = false;
      self.isWaitingForCodeVerification = false;
      self.userPhoneNumber = undefined;
      self.verificationCodeRequestedTime = 0;
    },
  }))
  .actions(self => ({
    /**
     */
    verifyAuthenticate: flow(function* (verificationCode: string) {
      if (!self.userPhoneNumber) {
        // this should never be happened
        console.tron?.error?.(
          'i forgot the user phone number',
          'auth-store.login',
        );
        return;
      }

      self.isLoading = true;

      const authApi = new AuthApi(self.environment.api);
      const response: ApiResponse<AuthenticationResult> =
        yield authApi.verifyAuthenticate(verificationCode, self.token);

      console.log(response);

      if (response.kind === 'ok') {
        self.token = response.data.token;

        // TokenManager.set(response.data.token);

        self.tokenType = response.data.tokenType;
        self.isWaitingForCodeVerification = false;
        if (response.data.tokenType === TokenType.Register) {
          self.isRequiredRegister = true;
        } else {
          yield TokenManager.set(response.data.token);
          self.isLoggedIn = true;
        }
      }

      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    authenticate: flow(function* (phoneNumber) {
      self.isLoading = true;

      const authApi = new AuthApi(self.environment.api);
      const response: ApiResponse<AuthenticationResult> =
        yield authApi.authenticate(phoneNumber);

      self.isLoading = false;
      console.log(response);

      if (response.kind === 'ok') {
        self.userPhoneNumber = phoneNumber;
        self.token = response.data.token;
        self.tokenType = response.data.tokenType;
        self.verificationCodeReceiveTime = Date.now();
        self.isWaitingForCodeVerification = true;
        console.tron?.log?.('verification code has sended');
      }

      return response;
    }),
  }))
  .actions(self => ({
    register: flow(function* (firstName, lastName) {
      self.isLoading = true;

      const authApi = new AuthApi(self.environment.api);

      const response: ApiResponse<AuthenticationResult> =
        yield authApi.register({
          firstName: firstName,
          lastName: lastName,
          email: self.userPhoneNumber + '@parlar.ir',
          registerToken: self.token,
        });

      if (response.kind === 'ok') {
        self.token = response.data.token;
        self.tokenType = response.data.tokenType;
        yield TokenManager.set(response.data.token);
        self.isLoggedIn = true;
      }
      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    logout: (): void => {
      self.isLoggedIn = false;
      self.resetCodeVerificationStates();
    },
    setSliderVersion: (version: number): void => {
      self.sliderVersion = version;
    },
  }));

type AuthStoreType = Instance<typeof AuthStoreModel>;
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
