import * as roomApi from "../lib/room";
import * as planApi from "../lib/plans";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createThunk} from "./utils";


const initialState = {
    roomInfo: null,
    roomRules: [],
    roomList: [],
    /** 기본 값이 바뀔경우 수정 필요 **/
    roomRequest: {
        title: '',
        max_user_num: 2,
        start_date: null,
        week: 1,
        current_week: 1,
        entry_fee: 5000,
        rule_id: 1,
        account: '',
    },
    waitingParticipants: [],
    participants: [],
    rank: [],
    refund: null,
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
export const fetchRank = createThunk("room/FETCH_RANK", roomApi.fetchRank);
export const fetchRefund = createThunk("room/FETCH_REFUND", roomApi.fetchRefund);
export const createRoom = createAsyncThunk(
    "plan/CREATE_ROOM",
    async (args, thunkApi) => {
        try {
            /** 방 생성 **/
            const createdRoomInfo = await roomApi.createRoom(args);
            const {data: {participant_id: leaderParticipantId}} = createdRoomInfo;
            /** 리더의 plan 생성 **/
            await planApi.createPlan(leaderParticipantId);

            return createdRoomInfo;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);
const room = createSlice(
    {
        name: 'room',
        initialState,
        reducers: {
            approvalCompleted: (state, {payload: user_id}) => {
                const before = state.waitingParticipants;
                const after = before.filter(participant => participant.user_id !== user_id);
                state.waitingParticipants = after;
            },
            addParticipant: (state, {payload: participant}) => {
                const participants = state.participants;
                participants.push(participant);
                state.participants = participants;
            },
            onChangeRoomRequest: (state, {payload: request}) => {
                state.roomRequest = request;
            },
            resetRoomCreateRequest: (state, action) => {
                state.roomRequest = {
                    title: '',
                    max_user_num: 2,
                    start_date: null,
                    week: 1,
                    current_week: 1,
                    entry_fee: 5000,
                    rule_id: 1,
                    account: '',
                }
            },
            resetRoom: (state) => {
                state.roomInfo = null;
                state.participants = [];
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
                    state.roomInfo = data;
                })
                .addCase(createRoom.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.error = message;
                })

                .addCase(fetchParticipants.fulfilled, (state, {payload: {data, accepted}}) => {
                    if (accepted) {
                        state.participants = data;
                    } else {
                        state.waitingParticipants = data;
                    }
                })
                .addCase(fetchRank.fulfilled, (state, {payload: {data}}) => {
                    state.rank = data;
                })
                .addCase(fetchRefund.fulfilled, (state, {payload: {data}}) => {
                    state.refund = data;
                })
                .addCase(fetchRefund.rejected, (state, {payload: {message}}) => {
                    state.refund = null;
                })

        }
    }
);

export const {
    approvalCompleted,
    addParticipant,
    onChangeRoomRequest,
    resetRoomCreateRequest,
    resetRoom,
    resetStatus,
} = room.actions;

export default room.reducer;
