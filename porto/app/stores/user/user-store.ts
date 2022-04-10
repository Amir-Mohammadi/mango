import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import {
    AuthenticationResult,
    TokenType,
    UserApi,
    UserProfileEdit,
    UserProfileResult
} from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { FilesApi } from '../../services/api/files';
import { enumerate } from '../../utils/enumeration';
import { withEnvironment } from '../extensions/with-environment';

export const UserStoreModel = types
  .model('UserProfileStore')
  .props({
    id: types.optional(types.string, ''),
    /**
     * user phone number
     */
    phone: types.optional(types.string, ''),
    /**
     * user email
     */
    email: types.optional(types.string, ''),
    /**
     * user full name
     */
    firstName: types.optional(types.string, ''),
    /**
     * user full name
     */
    lastName: types.optional(types.string, ''),
    /**
     * link to google account to store
     */
    isLinkedGoogleAccount: types.optional(types.boolean, false),
    /**
     * profile Image
     */
    profileImage: types.maybeNull(types.string),
    /**
     * token, its better to move this property to secret database
     * and only use the isLoggedIn flag
     */
    token: types.optional(types.string, ''),
    /**
     * this indicate the receive token is which type
     */
    tokenType: types.optional(
      enumerate<TokenType>('tokenType', Object.values(TokenType)),
      TokenType.ChangePhone,
    ),
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
    isLoading: true,
  }))
  .extend(withEnvironment)
  .actions(self => ({
    updateUser: (user: UserProfileEdit): void => {
      self.id = user.id ?? '';
      self.lastName = user.lastName ?? '';
      self.firstName = user.firstName ?? '';
      self.email = user.email ?? '';
      self.isLinkedGoogleAccount = user.isLinkedGoogleAccount ?? false;
      self.phone = user.phone ?? '';
      self.profileImage = user.mainGalleryImageUrl ?? null;
    },
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    getUserProfile: flow(function* () {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileResult> =
        yield userApi.getUserProfile();

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
      self.isLoading = false;
      return response;
    }),
  }))
  // .actions(self => ({
  //   /**
  //    * this action will get user profile from
  //    */
  //   getMembers: flow(function* (page: string, pageSize: string) {
  //     self.isLoading = true;

  //     const userApi = new UserApi(self.environment.api);

  //     const response: ApiResponse<Array<UserProfileResult>> =
  //       yield userApi.getMembers({
  //         page: page,
  //         pageSize: pageSize
  //       });

  //     if (response.kind === 'ok') {
  //       self.updateUser(response.data);
  //     }
  //     self.isLoading = false;
  //     return response;
  //   }),
  // }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    editEmailUserProfile: flow(function* (email: string) {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileEdit> =
        yield userApi.editUserProfile({
          email: email,
          firstName: self.firstName,
          lastName: self.lastName,
        });

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
      self.isLoading = false;
    }),
  }))
  .actions(self => ({
    /**
     * this action will change user phone from
     */
    changeUserPhoneProfile: flow(function* (phone: string) {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<AuthenticationResult> =
        yield userApi.editUserProfilePhone(phone);

      if (response.kind === 'ok') {
        self.phone = phone;
        self.token = response.data.token;
        self.tokenType = response.data.tokenType;
        self.verificationCodeReceiveTime = Date.now();
        self.isWaitingForCodeVerification = true;
      }
      self.isLoading = false;
      return response;
    }),
  }))
  .actions(self => ({
    /**
     * this action will change user phone from
     */
    verifyUserPhoneProfile: flow(function* (verificationCode: string) {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<AuthenticationResult> =
        yield userApi.verifyUserProfilePhone(verificationCode, self.token);

      if (response.kind === 'ok') {
        self.token = response.data.token;

        //TokenManager.set(response.data.token);

        self.tokenType = response.data.tokenType;
        self.isWaitingForCodeVerification = false;
      }

      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    /**
     * this action will change user phone from
     */
    changeUserImageProfile: flow(function* (email: string) {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileEdit> =
        yield userApi.editUserProfile({
          email: email,
          firstName: self.firstName,
          lastName: self.lastName,
          phone: self.phone,
          profileImageId: self.profileImage ?? undefined,
        });

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
      self.isLoading = false;
    }),
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    editFirstNameUserProfile: flow(function* (firstName: string) {
      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileEdit> =
        yield userApi.editUserProfile({
          email: self.email,
          firstName: firstName,
          lastName: self.lastName,
        });

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
    }),
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    editFullNameUserProfile: flow(function* (
      firstName: string,
      lastName: string,
    ) {
      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileEdit> =
        yield userApi.editUserProfile({
          email: self.email,
          firstName: firstName,
          lastName: lastName,
        });

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
    }),
  }))
  .actions(self => ({
    /**
     * this action will delete user profile from
     */
    deleteUser: flow(function* () {
      self.isLoading = true;

      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<Array<UserProfileResult>> =
        yield userApi.deleteUser();

      if (response.kind === 'ok') {
      }
      self.isLoading = false;
      return response;
    }),
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    editLastNameUserProfile: flow(function* (lastName: string) {
      self.isLoading = true;
      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<UserProfileEdit> =
        yield userApi.editUserProfile({
          email: self.email,
          firstName: self.firstName,
          lastName: lastName,
        });

      if (response.kind === 'ok') {
        self.updateUser(response.data);
      }
      self.isLoading = false;
      return response;
    }),
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    editProfileImage: flow(function* (image: FormData) {
      // 1) api call, upload myPicture, get guid of that file
      // 2) edit profile and add guid to image
      self.isLoading = true;
      const filesApi = new FilesApi(self.environment.api);
      const userApi = new UserApi(self.environment.api);

      const response: ApiResponse<string[]> =
        yield filesApi.uploadFileToSession(image);

      if (response.kind === 'ok' && response.data[0]) {
        const responseImage: ApiResponse<UserProfileEdit> =
          yield userApi.editUserProfile({
            email: self.email,
            firstName: self.firstName,
            lastName: self.lastName,
            profileImageId: response.data[0],
          });
        if (responseImage.kind === 'ok') self.updateUser(responseImage.data);
      }
      self.isLoading = false;
      return;
    }),
  }));

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
