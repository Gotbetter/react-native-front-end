import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth";
import {createThunk} from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    tokens: null,
    user: null,
    status: {
        REGISTER: null,
        LOGIN: null,
        DUPLICATE_CHECKED: null,
    },
    error: null,
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
            resetDuplicate: (state) => {
                state.status.DUPLICATE_CHECKED = null;
            },
            resetRegister: (state) => {
                state.status.REGISTER = null;
            },
            logout: (state) => {
                state.status.LOGIN = null;
                state.user = null;
            },
            setLogin: (state) => {
                state.status.LOGIN = 200;
            },
            resetLoginStatus: (state) => {
                state.status.LOGIN = null;
            }
        },
        /**
         * 400 error는 클라이언트에서 block
         * @param builder
         */
        extraReducers: (builder) => {
            builder
                .addCase(register.fulfilled, (state, {payload: {status}}) => {
                    state.status.REGISTER = status;
                })
                .addCase(register.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.status.REGISTER = status;
                    state.error = message;
                })
                .addCase(checkDuplicate.fulfilled, (state, {payload: {status}}) => {
                    state.status.DUPLICATE_CHECKED = status;
                })
                .addCase(checkDuplicate.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.status.DUPLICATE_CHECKED = status;
                    state.error = message;
                })
                .addCase(login.fulfilled, (state, {payload: {data, status}}) => {

                    const {access_token, refresh_token} = data;

                    const storeToken = async () => {
                        await AsyncStorage.setItem("access_token", access_token);
                        await AsyncStorage.setItem("refresh_token", refresh_token);
                    }
                    storeToken();
                    state.status.LOGIN = status;

                })
                .addCase(login.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error = message;
                    state.status.LOGIN = status;
                })
                .addCase(fetchUser.pending, (state) => {

                })
                .addCase(fetchUser.fulfilled, (state, {payload: {data}}) => {
                    state.user = data;
                })
                .addCase(fetchUser.rejected, (state, {payload: {message, response:{status}}}) => {
                    state.status.LOGIN = status;
                })

        },
    }
);

export const {resetDuplicate, resetRegister, logout, setLogin,resetLoginStatus} = auth.actions;

export default auth.reducer;
