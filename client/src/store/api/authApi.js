import { createApi } from '@reduxjs/toolkit/query/react';
import { setAuth, clearAuth } from '../slices/authSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { customBaseQuery } from '../customBaseQuery';

export const clearAuthThunk = createAsyncThunk(
  "auth/clearAuth",
  async (_, { dispatch }) => {
    dispatch(authApi.util.resetApiState());
    dispatch(clearAuth());
  }
);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    login: builder.mutation({
        query: (credentials) => ({
          url: '/authenticate',
          method: 'POST',
          body: credentials,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const token = data.id_token;
      
            dispatch(setAuth({ token }));
      
            const accountResult = await dispatch(
                authApi.endpoints.getAccount.initiate(undefined, { forceRefetch: true })
              ).unwrap();
              
      
            dispatch(setAuth({ token, account: accountResult }));
          } catch (error) {
            console.error("Login sonrası hata:", error);
            dispatch(clearAuth());
          }
        },
      }),
      
      getAccount: builder.query({
        query: () => ({
          url: "/account",
          method: "GET"
        }),
        providesTags: ["Account"],
        keepUnusedDataFor: 0, 
      }),
      
  })
});

export const { useLoginMutation, useGetAccountQuery } = authApi;
export default authApi;
