import { createSlice } from '@reduxjs/toolkit'
import { Storage } from '../../utils/storageUtil'
import authApi from '../api/authApi'

const storedToken = Storage.local.get("token");
const storedUser = Storage.local.get("user");
const storedAccount = Storage.local.get("account");

const initialState = {
    token: storedToken,
    user: storedUser,
    isAuthenticated: !!storedToken,
    loading: false,
    loginSuccess: false,
    loginError: false, 
    showModalLogin: false,
    account: storedAccount,
    errorMessage: null, 
    redirectMessage: null,
    sessionHasBeenFetched: false,
    logoutUrl: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token;
            state.user = JSON.stringify(action.payload.user);
            state.isAuthenticated = true;
            Storage.local.set("token", action.payload.token);
            Storage.local.set("user", action.payload.user);
        },
        clearAuth: (state, action) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.account = null;
            Storage.local.remove("token");
            Storage.local.remove("user");
            Storage.local.remove("account");
            authApi.util.resetApiState();
        },
        setAccount: (state, action) => {
            state.account = action.payload;
            Storage.local.set("account", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getAccount.matchFulfilled,
            (state, action) => {
                state.account = action.payload;
                state.sessionHasBeenFetched = true;
                Storage.local.set("account", action.payload);
                
                return state; 
            },
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                state.errorMessage = action.error.message;
            }
        )
    }
})


export const {setAuth, clearAuth, setAccount}  = authSlice.actions;
export default authSlice.reducer;