import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth/auth";

const initialState = {
    user: null,
    isDuplicate: null,
    loading: {
        REGISTER: false,
        LOGIN: false,
        CHECK_DUPLICATE: false,
    },
    status: {
        REGISTER: false,
        LOGIN: false,
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
            await api.checkDuplicate(arg);
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
            return response.data;
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
                state.isDuplicate = false;
            },
            resetRegister: (state) => {
                state.status.REGISTER = false;
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
                .addCase(register.pending, (state) => {
                    state.loading.REGISTER = true;
                })
                .addCase(register.fulfilled, (state) => {
                    state.loading.REGISTER = false;
                    state.status.REGISTER = true;
                })
                .addCase(register.rejected, (state, action) => {
                    state.loading.REGISTER = false;
                    state.error = action.error;
                })
                // checkDuplicate
                .addCase(checkDuplicate.pending, (state) => {
                    state.loading.CHECK_DUPLICATE = true;
                })
                .addCase(checkDuplicate.fulfilled, (state) => {
                    state.isDuplicate = false;
                })
                .addCase(checkDuplicate.rejected, (state, action) => {
                    /**
                     *  rejected 되는 경우는 아이디 중복되는 경우 하나
                     *  아이디 입력 안했을시 발생하는 400은 클라이언트에서 차단
                     */
                    state.isDuplicate = true;
                    state.error = action.error;
                })
                .addCase(login.pending, (state) => {
                    state.loading.LOGIN = true;
                })
                .addCase(login.fulfilled, (state, {payload: user}) => {
                    state.loading.LOGIN = false;
                    state.user = user;
                    state.status.LOGIN = true;
                })
                .addCase(login.rejected, (state, action) => {
                    state.loading.LOGIN = false;
                    state.error = action.error;
                });
        },
    }
);

export const {resetDuplicate, resetRegister, logout, setUser} = auth.actions;

export default auth.reducer;
