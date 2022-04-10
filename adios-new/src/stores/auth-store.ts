import { authApi } from '@/service/api/auth/auth-api';
import { TokenType } from '@/service/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface authStore {
  token: string;
}

const initialState: authStore = {
  token: '',
};

export const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verifyAuthenticate.matchFulfilled,
      (state, { payload }) => {
        if (payload.tokenType === TokenType.Auth) {
          state.token = payload.token;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        if (payload.tokenType === TokenType.Auth) {
          state.token = payload.token;
          state.token = payload.refreshToken;
        }
      }
    );
  },
});

export const { setToken } = authStore.actions;
