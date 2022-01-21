import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth";
import {applyMiddleware} from "redux";
import usersReducer from "./users";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
})

const middlewareEnhancer = applyMiddleware()

export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middlewareEnhancer
    })
}

