import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import ReduxThunk from 'redux-thunk';
import auth from "./auth";
import room from "./room";

export const store = configureStore({
    reducer: {
        auth,
        room,
    },
    middleware: [ReduxThunk, logger],
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
});
