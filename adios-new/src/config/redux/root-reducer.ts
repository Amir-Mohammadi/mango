import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../../service/api/core/api';
import { authStore } from '../../stores/auth-store';
import { counterSlice } from '../../stores/counter-store';


const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [authStore.name]: authStore.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
