import * as api from "../lib/room/room";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {request} from "axios";


const initialState = {

    rules: null,
    room: null,
    rooms: null,
    loading: {
        RULES: false,
        ROOM: false,
        ROOMS: false,
    },
    status: {
        ROOM_CREATE: null,
        ROOM_FETCH: null,
        ROOMS_FETCH: null,
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

export const fetchRules = createAsyncThunk(
    "room/FETCH_RULES",
    async (accessToken, thunkApi) => {
        try {
            const response = await api.fetchRules(accessToken);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const fetchRoom = createAsyncThunk(
    "room/FETCH_ROOM",
    async (args, thunkApi) => {
        const {accessToken, room_id, query} = args;
        try {
            const response = await api.fetchRoom({accessToken, room_id, query})
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const fetchRooms = createAsyncThunk(
    "room/FETCH_ROOMS",
    async (accessToken, thunkApi) => {
        try {
            const response = await api.fetchRooms(accessToken);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const createRoom = createAsyncThunk(
    "room/CREATE_ROOM",
    async (args, thunkApi) => {
        const {accessToken, request} = args;
        try {
            const response = await api.createRoom({accessToken, request});
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const joinRoom = createAsyncThunk(
    "room/JOIN_ROOM",
    async (args, thunkApi) => {
        const {accessToken, room_code} = args;
        try {
            const response = await api.createRoom({accessToken, room_code});
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

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
                // 규칙 조회
                .addCase(fetchRules.pending, (state, action) => {
                    state.loading.RULES = true
                })
                .addCase(fetchRules.fulfilled, (state, action) => {
                    state.loading.RULES = false;
                    state.rules = action.payload;
                })
                .addCase(fetchRules.rejected, (state, action) => {
                    state.loading.RULES = false;
                    state.error = action.error;
                })
                // 방 단일 조회
                .addCase(fetchRoom.pending, (state, action) => {
                    state.loading.ROOM = true;
                })
                .addCase(fetchRoom.fulfilled, (state, action) => {
                    state.loading.ROOM = false;
                    state.status.ROOM_FETCH = 200;
                    state.room = action.payload;
                })
                .addCase(fetchRoom.rejected, (state, action) => {
                    state.loading.ROOM = false;
                    state.status.ROOM_FETCH = action.payload.request.status;
                    state.error = action.error;
                })
                // 방 리스트 조회
                .addCase(fetchRooms.pending, (state, action) => {
                    state.loading.ROOMS = true;
                })
                .addCase(fetchRooms.fulfilled, (state, action) => {
                    state.loading.ROOMS = false;
                    state.rooms = action.payload;
                })
                .addCase(fetchRooms.rejected, (state, action) => {
                    state.loading.ROOMS = false;
                    state.error = action.error;
                })
                // 방 생성
                .addCase(createRoom.fulfilled, (state, action) => {
                    state.status.ROOM_CREATE = 201;
                    state.room = action.payload;
                })
                .addCase(createRoom.rejected, (state, action) => {
                    state.status.ROOM_CREATE = action.payload.request.status;
                    state.error = action.error;
                })
                // 방 참여
                .addCase(joinRoom.fulfilled, (state, action) => {

                })
                .addCase(joinRoom.rejected, (state, action) => {

                });
        }
    }
)

export const {onChangeRequest, resetRequest, resetStatus} = room.actions;

export default room.reducer;
