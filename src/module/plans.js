import {createSlice} from "@reduxjs/toolkit";
import {createThunk} from "./utils";
import * as api from "../lib/plans";

const initialState = {
    plans: null,
    dislike: null,
    detail_plans: null,
    error: null,
    loading: {
        FETCH_PLANS: null,
        FETCH_PLAN_DISLIKE: null,
    },
    status: {
        FETCH_PLANS: null,
    }

};

export const fetchPlans = createThunk("plans/FETCH_PLANS", api.fetchPlans);

export const fetchPlanDislike = createThunk("plans/FETCH_PLAN_DISLIKE", api.fetchPlanDislike);

const plans = createSlice(
    {
        name: 'plans',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchPlans.pending, (state) => {
                    state.loading.FETCH_PLANS = true;
                })
                .addCase(fetchPlans.fulfilled, (state, {payload: {data}}) => {
                    state.loading.FETCH_PLANS = false;
                    state.plans = data;
                })
                .addCase(fetchPlans.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error = message;
                    state.loading.FETCH_PLANS = false;
                    state.status.FETCH_PLANS = status;
                })
                .addCase(fetchPlanDislike.pending, (state) => {

                })
        },
    }
);


export const {} = plans.actions;

export default plans.reducer;


