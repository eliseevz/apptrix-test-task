import {createSlice} from "@reduxjs/toolkit";
import authService from "../services/authService";
import {setTokens} from "../services/localStorageService";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: false,
        isLoading: false,
        error: null
    },
    reducers: {
        authRequest: state => {
            state.isLoading = true
        },
        authSuccess: (state, action) => {
            state.isLoading = false
            state.auth = true
        },
        authFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: authReducer, actions} = authSlice
const {authRequest, authSuccess, authFailed} = actions


export const login = ({username, password}) => async dispatch => {
    console.log({username, password})
    dispatch(authRequest())
    try {
        const response = await authService.login({username, password})
        dispatch(authSuccess(response))
        setTokens(response)
    } catch (e) {
        console.log(e.message)
        dispatch(authFailed(e.message))
    }
}

export default authReducer