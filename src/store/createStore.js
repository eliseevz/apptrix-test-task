import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth";
import {applyMiddleware} from "redux";

const rootReducer = combineReducers({
    auth: authReducer
})

const middlewareEnhancer = applyMiddleware()

export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middlewareEnhancer
    })
}

