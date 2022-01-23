import {createSlice} from "@reduxjs/toolkit";
import authService from "../services/authService";
import {getAccessToken, removeAuthData, setTokens} from "../services/localStorageService";
import history from "../utils/history";

const initialState =
    getAccessToken()
        ? {
            auth: true,
            isLoading: false,
            error: null
        }
        : {
            auth: false,
            isLoading: false,
            error: null
        }

const authSlice = createSlice({
    name: "auth",
    initialState,
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
        },
        authLogout: (state) => {
            state.auth = false
        }
    }
})

const {reducer: authReducer, actions} = authSlice
const {authRequest, authSuccess, authFailed, authLogout} = actions


export const login = ({username, password}) => async dispatch => {
    dispatch(authRequest())
    try {
        const response = await authService.login({username, password})
        dispatch(authSuccess(response))
        setTokens(response)
    } catch (e) {
        dispatch(authFailed(e.message))
    }
}

export const logout = () => (dispatch) => {
    removeAuthData()
    dispatch(authLogout())
    history.push('/')
}

export const getAuthStatus = () => (state) => {
    return state.auth.auth
}



export default authReducer