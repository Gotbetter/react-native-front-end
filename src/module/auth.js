import {createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth";
import {createThunk} from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    user: null,
    status: {
        REGISTER: null,
        LOGIN: null,
        DUPLICATE_CHECKED: null,
        PASSWORD_CONFIRMED: false
    },
    error: {
        message: null,
        LOGIN: false,
        DUPLICATE_CHECK: false,
        PASSWORD_CONFIRM: false,
        EMAIL_CHECK: false,
        REGISTER_REQUIRED: false,
    },
};


export const register = createThunk("auth/REGISTER", api.register);
export const checkDuplicate = createThunk("auth/CHECK_DUPLICATE", api.checkDuplicate);
export const login = createThunk("auth/LOGIN", api.login);
export const fetchUser = createThunk("auth/FETCH_USER", api.fetchUser);

const auth = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            resetStatus: (state, {payload: key}) => {
                const before = state.status;
                const next = {
                    ...before,
                    [key]: key === "PASSWORD_CONFIRMED" ? false : null,
                };
                state.status = next;
            },
            passwordConfirmed: (state) => {
                state.status.PASSWORD_CONFIRMED = true;
            },
            logout: (state) => {
                state.status.LOGIN = null;
                state.user = null;
            },
            setError: (state, {payload: key}) => {
                const before = state.error;
                const next = {
                    ...before,
                    [key]: true,
                };
                state.error = next;
            },
            resetError: (state, {payload: key}) => {
                const before = state.error;
                const next = {
                    ...before,
                    [key]: false,
                };
                state.error = next;
            },
            resetAllError: (state) => {
                state.error = {
                    message: null,
                    LOGIN: false,
                    DUPLICATE_CHECK: false,
                    PASSWORD_CONFIRM: false,
                    EMAIL_CHECK: false,
                    REGISTER_REQUIRED: false,
                };
            },

        },
        /**
         * 400 error는 클라이언트에서 block
         * @param builder
         */
        extraReducers: (builder) => {
            builder
                .addCase(register.fulfilled, (state, {payload: {status}}) => {
                    state.status.REGISTER = status;
                    state.error.message = null;
                    state.error.REGISTER = false;
                })
                .addCase(register.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.status.REGISTER = status;
                    state.error.message = message;
                    state.error.REGISTER = true;
                    state.error.EMAIL_CHECK = true;
                })
                .addCase(checkDuplicate.fulfilled, (state, {payload: {status}}) => {
                    state.status.DUPLICATE_CHECKED = status;
                    state.error.DUPLICATE_CHECK = false;
                })
                .addCase(checkDuplicate.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.status.DUPLICATE_CHECKED = status;
                    state.error.message = message;
                })
                .addCase(login.fulfilled, (state, {payload: {data, status}}) => {

                    const {access_token, refresh_token} = data;

                    const storeToken = async () => {
                        await AsyncStorage.setItem("access_token", access_token);
                        await AsyncStorage.setItem("refresh_token", refresh_token);
                    }
                    storeToken();
                    state.status.LOGIN = status;
                    state.error.LOGIN = false;
                    state.error.message = null;

                })
                .addCase(login.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error.message = message;
                    state.status.LOGIN = status;
                    state.error.LOGIN = true;
                })
                .addCase(fetchUser.pending, (state) => {

                })
                .addCase(fetchUser.fulfilled, (state, {payload: {data}}) => {
                    state.user = data;
                })
                .addCase(fetchUser.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.status.LOGIN = status;
                })

        },
    }
);

export const {
    logout,
    resetError,
    resetAllError,
    resetStatus,
    setError,
    passwordConfirmed

} = auth.actions;

export default auth.reducer;
