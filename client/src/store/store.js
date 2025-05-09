import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import apiMiddlewares from './middlewares';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }) 
      .concat(apiMiddlewares)
});



export default store;
