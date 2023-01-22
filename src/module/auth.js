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
                    state.status.REGISTER = 201;
                })
                .addCase(register.rejected, (state, action) => {
                    state.status.REGISTER = action.payload.response.status;
                    state.error = action.error;
                })
                // checkDuplicate
                .addCase(checkDuplicate.fulfilled, (state,action) => {
                    state.status.DUPLICATE_CHECKED = 200;
                })
                .addCase(checkDuplicate.rejected, (state, action) => {
                    /**
                     *  rejected 되는 경우는 아이디 중복되는 경우 하나
                     *  아이디 입력 안했을시 발생하는 400은 클라이언트에서 차단
                     */
                    state.status.DUPLICATE_CHECKED = action.payload.response.status;;
                    state.error = action.error;
                })
                .addCase(login.fulfilled, (state, {payload: user}) => {
                    state.user = user;
                    state.status.LOGIN = action.payload.response.status;
                })
                .addCase(login.rejected, (state, action) => {
                    state.status.LOGIN = action.payload.response.status;
                    state.error = action.error;
                });
        },
    }
);

export const {resetDuplicate, resetRegister, logout, setUser} = auth.actions;

export default auth.reducer;
