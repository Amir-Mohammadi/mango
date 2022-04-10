import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  token: string | null;
  version: number;
}

const initialState: AppState = {
  token: null,
  version: 1,
};

const sliderStore = createSlice({
  name: 'sliderStore',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setVersion : (state, action: PayloadAction<number>) => {
      state.version = action.payload
    }
  },
});

export const { setToken, setVersion } = sliderStore.actions;
export const { reducer: sliderStoreReducer } = sliderStore;
