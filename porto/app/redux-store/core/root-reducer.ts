import { combineReducers } from '@reduxjs/toolkit';
import { drawerStoreReducer } from '../drawer-store';
import { sliderStoreReducer } from '../slider-store';

const rootReducer = combineReducers({
  sliderStore: sliderStoreReducer,
  drawerStore: drawerStoreReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
