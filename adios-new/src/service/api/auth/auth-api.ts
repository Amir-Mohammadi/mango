import { IAuthenticationInput, IAuthenticationResult } from '../../types';
import { IRegisterInput } from '../../types/IRegisterInput';
import { IVerifyAuthenticateInput } from '../../types/IVerifyAuthenticateInput';
import { api } from '../core/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticate: build.mutation<IAuthenticationResult, IAuthenticationInput>({
      query: (body) => ({
        url: `users/authenticate`,
        method: 'POST',
        body: body,
      }),
    }),
    verifyAuthenticate: build.mutation<
      IAuthenticationResult,
      IVerifyAuthenticateInput
    >({
      query: (body) => ({
        url: `users/verify-authenticate`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [],
    }),
    register: build.mutation<IAuthenticationResult, IRegisterInput>({
      query: (body) => ({
        url: `users/register`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useVerifyAuthenticateMutation,
  useRegisterMutation,
} = authApi;
