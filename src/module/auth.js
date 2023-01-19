import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const auth = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {},
        extraReducers: (builder) => {

        },
    }
);

export default auth.reducer;
