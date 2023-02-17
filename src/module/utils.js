import {createAsyncThunk} from "@reduxjs/toolkit";

export function createThunk(type, call) {

    return createAsyncThunk(
        type,
        async (args, thunkApi) => {
            try {
                return await call(args);
            } catch (error){
                return thunkApi.rejectWithValue(error);
            }
        }
    );
}
