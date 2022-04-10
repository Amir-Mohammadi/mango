import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrawerState {
  visible: boolean;
}

const initialState: DrawerState = {
  visible: false,
};

const drawerStore = createSlice({
  name: 'drawerStore',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.visible = !state.visible;
    },
    setDrawer: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { toggleDrawer, setDrawer } = drawerStore.actions;
export const { reducer: drawerStoreReducer } = drawerStore;
