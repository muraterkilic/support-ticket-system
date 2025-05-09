import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import authApi from './api/authApi';
import ticketApi from './api/ticketApi';
import { adminApi } from './api/adminApi';


const rootReducer = combineReducers({
  authentication: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [ticketApi.reducerPath]:ticketApi.reducer,
  [adminApi.reducerPath]:adminApi.reducer,
  
});

export default rootReducer;
