import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth";
import usersReducer from "./users";
import issueReducer from "./issues";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    issues: issueReducer
})


export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}

