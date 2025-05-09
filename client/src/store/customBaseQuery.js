import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoading } from './slices/shared/loadingSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState();
        const token = state.authentication?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const customBaseQuery = async (args, api, extraOptions) => {
    api.dispatch(setLoading(true));
    
    try {
        const result = await baseQuery(args, api, extraOptions);
        return result;
    } catch (err) {
        
        throw err;
    } finally {
        api.dispatch(setLoading(false));
    }
};
