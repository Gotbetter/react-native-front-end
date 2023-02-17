import * as api from "../lib/room";
import {createSlice} from "@reduxjs/toolkit";

import {createThunk} from "./utils";



const initialState = {

    rules: null,
    room: null,
    participants: null,
    rooms: null,
    loading: {
        RULES: false,
        ROOM: false,
        ROOMS: false,
        PARTICIPANTS: false,
    },
    status: {
        ROOM_CREATE: null,
        ROOM_SEARCH: null,
        REQUEST_PARTICIPATE: null,
    },
    request: {
        title: '',
        max_user_num: null,
        start_date: null,
        week: null,
        current_week: 1,
        entry_fee: null,
        rule_id: null,
        account: '',
    },
    error: null,

};

export const fetchRoom = createThunk("room/FETCH_ROOM", api.fetchRoom);
export const fetchRooms = createThunk("room/FETCH_ROOMS", api.fetchRooms);
export const fetchRules = createThunk("room/FETCH_RULES", api.fetchRules);
export const createRoom = createThunk("room/CREATE_ROOM", api.createRoom);
export const fetchParticipants = createThunk("room/FETCH_PARTICIPANTS", api.fetchParticipants);

const room = createSlice(
    {
        name: 'room',
        initialState,
        reducers: {
            onChangeRequest: (state, {payload: request}) => {
                state.request = request;
            },
            resetRequest: (state, action) => {
                state.request = {
                    title: '',
                    max_user_num: null,
                    start_date: null,
                    week: null,
                    current_week: 1,
                    entry_fee: null,
                    rule_id: null,
                    account: '',
                }
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
                .addCase(fetchRules.pending, (state, action) => {
                    state.loading.RULES = true
                })
                .addCase(fetchRules.fulfilled, (state, {payload: {data}}) => {
                    state.loading.RULES = false;
                    state.rules = data;
                })
                .addCase(fetchRules.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.loading.RULES = false;
                    state.error = message;
                })
                .addCase(fetchRoom.pending, (state) => {
                    state.loading.Room = true;
                })
                .addCase(fetchRoom.fulfilled, (state, {payload: {data}}) => {
                    state.loading.Room = false;
                    state.room = data;
                })
                .addCase(fetchRoom.rejected, (state, {payload: message, response: {status}}) => {
                    state.loading.Room = false;
                    state.error = message;
                    state.status.ROOM_SEARCH = status;
                })
                .addCase(fetchRooms.pending, (state, action) => {
                    state.loading.ROOMS = true;
                })
                .addCase(fetchRooms.fulfilled, (state, {payload: {data}}) => {
                    state.loading.ROOMS = false;
                    state.rooms = data;
                })
                .addCase(fetchRooms.rejected, (state, {payload: {message}}) => {
                    state.loading.ROOMS = false;
                    state.error = message
                })
                .addCase(createRoom.fulfilled, (state, {payload: {status}}) => {
                    state.status.ROOM_CREATE = status;
                })
                .addCase(createRoom.rejected, (state, {payload: message, response: {status}}) => {
                    state.status.ROOM_CREATE = status
                    state.error = message;
                })
                .addCase(fetchParticipants.pending, (state) => {
                    state.loading.PARTICIPANTS = true;
                })
                .addCase(fetchParticipants.fulfilled, (state, {payload: {data}}) => {
                    state.loading.PARTICIPANTS = false;
                    state.participants = data;
                })
                .addCase(fetchParticipants.rejected, (state, {payload: message, response: {status}}) => {
                    state.loading.PARTICIPANTS = false;
                    state.error = message;
                });
        }
    }
)

export const {onChangeRequest, resetRequest, resetStatus} = room.actions;

export default room.reducer;
