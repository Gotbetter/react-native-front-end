import {createThunk} from "./utils";
import * as planApi from "../lib/plans";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    detailPlanRequest: "",
    plan: null,
    planDislikeInfo: null,
    detailPlans: [],
};

export const fetchDislikeInfo = createThunk("plan/FETCH_DISLIKE_INFO", planApi.fetchPlanDislike);
export const fetchDetailPlan = createThunk("plan/FETCH_DETAIL_PLAN", planApi.fetchDetailPlan);
export const fetchPlanAndDetailPlan = createAsyncThunk(
    "room/FETCH_PLAN_AND_DETAIL_PLAN",
    async (args, thunkApi) => {
        try {
            /**
             * args: (Object)
             * participant_id: (int)
             * week: (int)
             */
            /** fetch plan_id  **/
            const {data: plan} = await planApi.fetchPlan(args);
            thunkApi.dispatch(storePlan(plan));

            /** fetch planDislikeInfo **/
            const {data: planDislikeInfo} = await planApi.fetchPlanDislike(plan.plan_id);
            thunkApi.dispatch(storePlanDislikeInfo(planDislikeInfo));
            /** detail_plan fetch **/
            const {data: detailPlans} = await planApi.fetchDetailPlan(plan.plan_id);
            thunkApi.dispatch(storeDetailPlans(detailPlans));

        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }

    });
export const doPlanDislike = createThunk("plan/DISLIKE", planApi.doPlanDislike);
export const cancelPlanDislike = createThunk("plan/DISLIKE_CANCEL", planApi.cancelPlanDislike);
export const createDetailPlan = createThunk("plan/CREATE_DETAIL_PLAN", planApi.createDetailPlan);
export const modifyDetailPlan = createThunk("plan/MODIFY_DETAIL_PLAN", planApi.updateDetailPlan);
export const completeDetailPlan = createThunk("plan/COMPLETE_DETAIL_PLAN", planApi.completeDetailPlan);
export const undoCompleteDetailPlan = createThunk("plan/UNDO_COMPLETE_DETAIL_PLAN", planApi.undoCompleteDetailPlan);
export const doDetailPlanDislike = createThunk("plan/DISLIKE_DETAIL_PLAN", planApi.doDetailPlanDislike);
export const cancelDetailPlanDislike = createThunk("plan/CANCEL_DISLIKE_DETAIL_PLAN", planApi.cancelDetailPlanDislike);
const plan = createSlice(
    {
        name: 'plan',
        initialState,
        reducers: {
            storePlan: (state, {payload: plan}) => {
                state.plan = plan;
            },
            storePlanDislikeInfo: (state, {payload: planDislikeInfo}) => {
                state.planDislikeInfo = planDislikeInfo;
            },
            storeDetailPlans: (state, {payload: detailPlans}) => {
                state.detailPlans = detailPlans;
            },
            onChangeDetailPlanRequest: (state, {payload: request}) => {
                state.detailPlanRequest = request;
            },
            pressDislike: (state, {payload: checked}) => {
                state.planDislikeInfo.checked = !checked;
            },
            resetDetailPlanRequest: (state) => {
                state.detailPlanRequest = "";
            },
            resetPlanAndDetailPlan: (state) => {
                state.plan = null;
                state.detailPlans = [];
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(createDetailPlan.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    prev.push(data);
                    state.detailPlans = prev;
                })
                .addCase(modifyDetailPlan.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    const next = prev.map(detailPlan => detailPlan.detail_plan_id === data.detail_plan_id ? {
                        ...detailPlan,
                        content: data.content
                    } : detailPlan);
                    state.detailPlans = next;
                })
                .addCase(doPlanDislike.fulfilled, (state,{payload: {data}}) => {
                    state.planDislikeInfo.checked = data.checked;
                    state.planDislikeInfo.dislike_count = data.dislike_count;
                })
                .addCase(doPlanDislike.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(cancelPlanDislike.fulfilled, (state, {payload: {data}}) => {
                    state.planDislikeInfo.checked = data.checked;
                    state.planDislikeInfo.dislike_count = state.planDislikeInfo.dislike_count - 1;
                })
                .addCase(fetchDislikeInfo.fulfilled, (state, {payload: {data}}) => {
                    state.planDislikeInfo = data;
                })
                .addCase(fetchDislikeInfo.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(fetchDetailPlan.fulfilled, (state, {payload: {data}}) => {
                    state.detailPlans = data;
                })
                .addCase(fetchPlanAndDetailPlan.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                    state.plan = null;
                    state.detailPlans = null;
                })
                .addCase(completeDetailPlan.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    const next = prev.map(detailPlan => detailPlan.detail_plan_id === data.detail_plan_id ? {
                        ...detailPlan,
                        approve_comment: data.approve_comment,
                        complete: data.complete,
                        checked: data.checked
                    } : detailPlan);
                    state.detailPlans = next;
                })
                .addCase(completeDetailPlan.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(undoCompleteDetailPlan.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    const next = prev.map(detailPlan => detailPlan.detail_plan_id === data.detail_plan_id ? {
                        ...detailPlan,
                        approve_comment: "",
                        complete: data.complete,
                        checked: data.checked
                    } : detailPlan);
                    state.detailPlans = next;
                })
                .addCase(undoCompleteDetailPlan.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(doDetailPlanDislike.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    const next = prev.map(detailPlan => detailPlan.detail_plan_id === data.detail_plan_id ? {
                        ...detailPlan,
                        detail_plan_dislike_count: data.detail_plan_dislike_count,
                        detail_plan_dislike_checked: data.detail_plan_dislike_checked,
                    } : detailPlan);
                    state.detailPlans = next;
                })
                .addCase(doDetailPlanDislike.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(cancelDetailPlanDislike.fulfilled, (state, {payload: {data}}) => {
                    const prev = state.detailPlans;
                    const next = prev.map(detailPlan => detailPlan.detail_plan_id === data.detail_plan_id ? {
                        ...detailPlan,
                        detail_plan_dislike_count: data.detail_plan_dislike_count,
                        detail_plan_dislike_checked: data.detail_plan_dislike_checked,
                    } : detailPlan);
                    state.detailPlans = next;
                })
                .addCase(cancelDetailPlanDislike.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
        }
    }
);

export const {
    storePlan,
    storePlanDislikeInfo,
    storeDetailPlans,
    resetPlanAndDetailPlan,
} = plan.actions;

export default plan.reducer;
