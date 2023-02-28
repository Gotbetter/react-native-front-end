import * as roomApi from "../lib/room";
import * as planApi from "../lib/plans";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createThunk} from "./utils";


const initialState = {
    roomInfo: null,
    roomRules: [],
    roomList: [],
    roomRequest: {
        title: '',
        max_user_num: 1,
        start_date: null,
        week: null,
        current_week: 1,
        entry_fee: null,
        rule_id: null,
        account: '',
    },
    detailPlanRequest: "",
    waitingParticipants: [],
    participants: [],
    plan: null,
    planDislikeInfo: null,
    detailPlans: [],
    status: {
        ROOM_CREATE: null,
    },
    error: null,
};


export const fetchRoom = createThunk("room/FETCH_ROOM", roomApi.fetchRoom);
export const fetchRooms = createThunk("room/FETCH_ROOMS", roomApi.fetchRooms);
export const fetchParticipants = createAsyncThunk("room/FETCH_PARTICIPANTS",
    async (args, thunkApi) => {
        const {accepted} = args;
        try {
            const {data} = await roomApi.fetchParticipants(args);
            return {data, accepted}
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);
export const fetchRules = createThunk("room/FETCH_RULES", roomApi.fetchRules);
export const fetchDislikeInfo = createThunk("plan/DISLIKE", planApi.fetchPlanDislike);
export const fetchDetailPlan = createThunk("plan/FETCH_DETAIL_PLAN", planApi.fetchDetailPlan);
export const createRoom = createAsyncThunk(
    "plans/CREATE_ROOM",
    async (args, thunkApi) => {
        try {
            /** 방 생성 **/
            const createdRoomInfo = await roomApi.createRoom(args);
            const {data:{participant_id: leaderParticipantId}} = createdRoomInfo;
            /** 리더의 plan 생성 **/
            await planApi.createPlan(leaderParticipantId);

            return createdRoomInfo;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);

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
export const planDislike = createThunk("plans/DISLIKE", planApi.planDislike);
export const planDislikeCancel = createThunk("plans/DISLIKE_CANCEL",planApi.planDislikeCancel);
export const createDetailPlan = createThunk("plans/CREATE_DETAIL_PLAN", planApi.createDetailPlan);
export const modifyDetailPlan = createThunk("plans/MODIFY_DETAIL_PLAN", planApi.updateDetailPlan);

const room = createSlice(
    {
        name: 'room',
        initialState,
        reducers: {
            storeParticipants: (state, {payload: participants}) => {
                state.participants = participants;
            },
            storePlan: (state, {payload: plan}) => {
                state.plan = plan;
            },
            storePlanDislikeInfo: (state, {payload: planDislikeInfo}) => {
                state.planDislikeInfo = planDislikeInfo;
            },
            storeDetailPlans: (state, {payload: detailPlans}) => {
                state.detailPlans = detailPlans;
            },
            pressDislike: (state, {payload: checked}) => {
                state.planDislikeInfo.checked = !checked;
            },
            onChangeRoomRequest: (state, {payload: request}) => {
                state.roomRequest = request;
            },
            onChangeDetailPlanRequest: (state, {payload: request}) => {
                state.detailPlanRequest = request;
            },
            resetRoomCreateRequest: (state, action) => {
                state.roomRequest = {
                    title: '',
                    max_user_num: null,
                    start_date: null,
                    week: null,
                    current_week: 1,
                    entry_fee: null,
                    rule_id: null,
                    account: '',
                };
            },
            resetDetailPlanRequest: (state) => {
                state.detailPlanRequest = "";
            },
            resetRoom: (state) => {
                state.roomInfo = null;
                state.participants = [];
            },
            resetPlanAndDetailPlan: (state) => {
                state.plan = null;
                state.detailPlans = [];
            },
            resetStatus: (state, action) => {
                state.status = {
                    ...state.status,
                    [action.payload]: null,
                };
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchRoom.fulfilled, (state, {payload: {data}}) => {
                    state.roomInfo = data;
                })
                .addCase(fetchRoom.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error = message;
                })
                .addCase(fetchRooms.fulfilled, (state, {payload: {data}}) => {
                    state.roomList = data;
                })
                .addCase(fetchRooms.rejected, (state, {payload: {message}}) => {
                    state.error = message
                })
                .addCase(fetchRules.fulfilled, (state, {payload: {data}}) => {
                    state.roomRules = data;
                })
                .addCase(fetchRules.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                })
                .addCase(createRoom.fulfilled, (state, {payload: {data, status}}) => {
                    state.status.ROOM_CREATE = status
                })
                .addCase(createRoom.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error = message;
                })
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
                .addCase(planDislike.rejected, (state, {payload: {message}}) => {
                    state.error = message;
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
                .addCase(fetchParticipants.fulfilled, (state, {payload: {data, accepted}}) => {
                    if (accepted) {
                        state.participants = data;
                    } else {
                        state.waitingParticipants = data;
                    }
                })
                .addCase(fetchPlanAndDetailPlan.rejected, (state, {payload: {message}}) => {
                    state.error = message;
                });

        }
    }
);

export const {
    storePlan,
    storePlanDislikeInfo,
    storeDetailPlans,
    onChangeRoomRequest,
    onChangeDetailPlanRequest,
    resetRoomCreateRequest,
    resetPlanAndDetailPlan,
    resetDetailPlanRequest,
    resetRoom,
    resetStatus,
    pressDislike
} = room.actions;

export default room.reducer;
