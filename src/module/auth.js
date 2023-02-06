import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth/auth";

const initialState = {
    user: null,
    status: {
        REGISTER: null,
        LOGIN: null,
        DUPLICATE_CHECKED: null,
    },
    error: null,
};


// thunk


export const register = createAsyncThunk(
    "auth/REGISTER",
    async (args, thunkApi) => {
        /**
         * @param args(object)
         * string auth_id;
         * string password;
         * string username;
         * string email;
         */
        try {
            await api.register(args);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const checkDuplicate = createAsyncThunk(
    "auth/CHECK_DUPLICATE",
    async (arg, thunkApi) => {
        /**
         * @param arg(string): auth_id
         */
        try {
            const response = await api.checkDuplicate(arg);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk(
    "auth/LOGIN",
    async (args, thunkApi) => {
        /**
         * @param args(object)
         * string auth_id
         * string password
         */
        try {
            const response = await api.login(args);
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)


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
                state.status.LOGIN = false;
                state.user = null;
            },
            setUser: (state, {payload: user}) => {
                state.user = user;
                state.status.LOGIN = true;
            },
        },
        extraReducers: (builder) => {
            builder
                // register
                .addCase(register.fulfilled, (state, action) => {
                    const {status} = action.payload;
                    state.status.REGISTER = status;
                })
                .addCase(register.rejected, (state, action) => {
                    const {message} = action.payload;
                    const {status} = action.payload.response;
                    state.status.REGISTER = status;
                    state.error = message;
                })
                // checkDuplicate
                .addCase(checkDuplicate.fulfilled, (state, action) => {
                    const {status} = action.payload;
                    state.status.DUPLICATE_CHECKED = status;
                })
                .addCase(checkDuplicate.rejected, (state, action) => {
                    /**
                     *  rejected 되는 경우는 아이디 중복되는 경우 하나
                     *  아이디 입력 안했을시 발생하는 400은 클라이언트에서 차단
                     */
                    const {message} = action.payload;
                    const {status} = action.payload.response;
                    state.status.DUPLICATE_CHECKED = status;
                    state.error = message;
                })
                .addCase(login.fulfilled, (state, action) => {
                    const {data, status} = action.payload;
                    state.user = data;
                    state.status.LOGIN = status;
                })
                .addCase(login.rejected, (state, action) => {
                    const {message} = action.payload;
                    const {status} = action.payload.response;
                    state.status.LOGIN = status;
                    state.error = message;
                });
        },
    }
);

export const {resetDuplicate, resetRegister, logout, setUser} = auth.actions;

export default auth.reducer;
