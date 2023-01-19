import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth/auth";

const initialState = {
    user: null,
    register_debug: null,
    isDuplicate: null,
    loading: {
        REGISTER: false,
        LOGIN: false,
        CHECK_DUPLICATE: false,
    },
    status: {
        REGISTER: false,
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
            const response = await api.register(args);
            console.log(response);
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
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);


const auth = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            resetDuplicate: (state, action) => {
                state.isDuplicate = false;
            },
            resetRegister: (state) => {
                state.status.REGISTER = false;
            },
        },
        extraReducers: (builder) => {
            builder
                // register
                .addCase(register.pending, (state) => {
                    state.loading.REGISTER = true;
                })
                .addCase(register.fulfilled, (state, {payload: register_debug}) => {
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
        },
    }
);

export const {resetDuplicate, resetRegister} = auth.actions;

export default auth.reducer;
