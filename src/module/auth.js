import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../lib/auth";
import {createThunk} from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    user: null,
    register: {
        request: {
            auth_id: "",
            password: "",
            username: "",
            email: "",
        },
        password_confirm: "",
        status: {
            AUTH_ID_DUPLICATE_CHECKED: false,
            PASSWORD_CONFIRMED: false,
            REQUIRED_FULFILLED: false,
            REGISTER_SUCCESS: false,
        },
        error: {
            DUPLICATED_AUTH_ID: false,
            FAILED_PASSWORD_CONFIRM: false,
            REQUIRED_UNFULFILLED: false,
            REGISTER_FAILED: false,
        },
        message: {
            DUPLICATE_CHECK_MESSAGE: "",
            PASSWORD_CONFIRM_MESSAGE: "",
            REGISTER_FAILED_MESSAGE: "",
        },
    },
    login: {
        request: {
            auth_id: "",
            password: "",
        },
        status: {
            LOGIN_SUCCESS: false,
        },
        error: {
            LOGIN_FAILED: false,
        },
        LOGIN_FAILED_MESSAGE: "",
    },
};


export const register = createAsyncThunk(
    "auth/REGISTER",
    async (args, thunkApi) => {

        const {auth: {register: {request, status}}} = thunkApi.getState();

        /** 아이디 중복확인 **/
        if (!status.AUTH_ID_DUPLICATE_CHECKED) {
            return thunkApi.rejectWithValue({message: "아이디 중복확인을 해주세요", response: {status: 400}});
        }
        /** 패스워드 재확인 **/
        if (!status.PASSWORD_CONFIRMED) {
            return thunkApi.rejectWithValue({message: "비밀번호 재확인을 해주세요", response: {status: 400}});
        }
        /** 모든 정보 입력했는지 **/
        let flag = true;
        for (const requestKey in request) {
            if (request[requestKey] === '') {
                flag = false;
            }
        }
        if (flag === false) {
            return thunkApi.rejectWithValue({message: "모든 정보를 입력해주세요", response: {status: 400}});
        }

        /** 400 check 이상 없으면 회원가입 진행 **/
        try {
            return await api.register(request);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }

    });
export const checkDuplicate = createAsyncThunk(
    "auth/CHECK_AUTH_ID_DUPLICATE",
    async (args, thunkApi) => {
        const {auth: {register: {request}}} = thunkApi.getState();
        try {
            return await api.checkDuplicate(request.auth_id);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk(
    "auth/LOGIN",
    async (args, thunkApi) => {
        const {auth: {login: {request}}} = thunkApi.getState();

        /** 400 Error check **/
        let flag = true;
        for (const requestKey in request) {
            if (request[requestKey] === "") {
                flag = false;
            }
        }

        if (flag === false) {
            return thunkApi.rejectWithValue({response: {status: 400}})
        }

        try {

            const response = await api.login(request);
            const {access_token, refresh_token} = response.data;

            try {
                await AsyncStorage.setItem("access_token", access_token);
                await AsyncStorage.setItem("refresh_token", refresh_token);

            } catch (error) {
                return thunkApi.rejectWithValue({response: {status: null}});
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
export const logout = createAsyncThunk(
    "auth/LOGOUT",
    async (args, thunkApi) => {
        try {
            const localStorageKeys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(localStorageKeys);

        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
export const fetchUser = createThunk("auth/FETCH_USER", api.fetchUser);

const auth = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            /** 회원가입에 필요한 입력값 들어오면 request에 적용 **/
            onChangeRegisterRequest: (state, {payload: {targetName, value}}) => {

                /** 아이디 중복 확인 이후 변경이 생길 경우 중복확인 상태 reset **/
                if (targetName === "auth_id") {
                    state.register.status.AUTH_ID_DUPLICATE_CHECKED = false;
                }

                /** 패스워드 확인 이후 변경이 생긴다면 패스워드 확인 reset **/
                if (targetName === "password" || targetName === "password_confirm") {
                    state.register.status.PASSWORD_CONFIRMED = false;
                }

                if (targetName === "password_confirm") {
                    state.register.password_confirm = value;
                } else {
                    state.register.request = {
                        ...state.register.request,
                        [targetName]: value,
                    };
                }
            },
            /** 비밀번호 중복확인 **/
            checkPasswordConfirm: (state) => {
                const {status, error, message, request: {password}} = state.register;
                const confirm_password = state.register.password_confirm;

                if (password !== confirm_password) {
                    error.FAILED_PASSWORD_CONFIRM = true;
                    status.PASSWORD_CONFIRMED = false;
                    message.PASSWORD_CONFIRM_MESSAGE = "비밀번호가 일치하지 않습니다.";
                } else {
                    error.FAILED_PASSWORD_CONFIRM = false;
                    status.PASSWORD_CONFIRMED = true;
                    message.PASSWORD_CONFIRM_MESSAGE = "비밀번호가 일치합니다.";
                }
            },
            /** 회원가입 모든 error 및 메세지 초기화 **/
            resetAllStatusAndError: (state) => {
                state.register = initialState.register;
                state.login = initialState.login;
            },
            /** 회원가입에 필요한 입력값 들어오면 request에 적용 **/
            onChangeLoginRequest: (state, {payload: {targetName, value}}) => {
                state.login.request = {
                    ...state.login.request,
                    [targetName]: value,
                };
            },

        },
        extraReducers: (builder) => {
            builder
                .addCase(register.fulfilled, (state) => {
                    state.register.status.REGISTER_SUCCESS = true;
                    state.register.error.REGISTER_FAILED = false;
                })
                .addCase(register.rejected, (state, {payload: {message, response: {status}}}) => {
                    state.register.status.REGISTER_SUCCESS = false;
                    state.register.error.REGISTER_FAILED = true;

                    if (status === 500) {
                        state.register.message.REGISTER_FAILED_MESSAGE = message;
                    } else if (status === 409) {
                        state.register.message.REGISTER_FAILED_MESSAGE = "중복된 이메일 입니다.";
                        state.register.error.DUPLICATED_EMAIL = true;
                    } else if (status === 400) {
                        state.register.message.REGISTER_FAILED_MESSAGE = message;
                    }
                })
                .addCase(checkDuplicate.fulfilled, (state) => {
                    state.register.status.AUTH_ID_DUPLICATE_CHECKED = true;
                    state.register.error.DUPLICATED_AUTH_ID = false;
                    state.register.message.DUPLICATE_CHECK_MESSAGE = "사용 가능한 아이디입니다.";
                })
                .addCase(checkDuplicate.rejected, (state, {payload: {response: {status}}}) => {
                    state.register.status.AUTH_ID_DUPLICATE_CHECKED = false;
                    state.register.error.DUPLICATED_AUTH_ID = true;

                    if (status === 400) {
                        state.register.message.DUPLICATE_CHECK_MESSAGE = "아이디를 입력해주세요.";
                    } else if (status === 409) {
                        state.register.message.DUPLICATE_CHECK_MESSAGE = "중복된 아이디입니다.";
                    }
                })
                .addCase(login.fulfilled, (state) => {
                    state.login.status.LOGIN_SUCCESS = true;
                })
                .addCase(login.rejected, (state, {payload: {response: {status}}}) => {
                    state.login.error.LOGIN_FAILED = true;
                    if (status === 400) {
                        state.login.LOGIN_FAILED_MESSAGE = "아이디 또는 비밀번호를 모두 입력해주세요";
                    } else if (status === 404) {
                        state.login.LOGIN_FAILED_MESSAGE = "아이디 또는 비밀번호를 확인해주세요.";
                    } else {
                        state.login.LOGIN_FAILED_MESSAGE = "알 수 없는 오류.";
                    }
                })
                .addCase(logout.fulfilled, (state) => {
                    state.login.status.LOGIN_SUCCESS = false;
                })
                .addCase(fetchUser.fulfilled, (state, {payload: {data}}) => {
                    state.user = data;
                });
        },
    }
);

export const {
    onChangeRegisterRequest,
    onChangeLoginRequest,
    resetAllStatusAndError,
    checkPasswordConfirm
} = auth.actions;

export default auth.reducer;
