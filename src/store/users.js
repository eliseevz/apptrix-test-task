import {createSlice} from "@reduxjs/toolkit";
import youTrackService from "../services/youTrackService";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        isLoading: false,
        error: null,
        dataLoaded: false
    },
    reducers: {
        usersRequest: state => {
            state.isLoading = true
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        usersRequestSuccess: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.dataLoaded = true
        }
    }
})



const {reducer: usersReducer, actions} = usersSlice
const {usersRequest, usersRequestFailed, usersRequestSuccess} = actions

export const loadUsers = () => async (dispatch) => {
    dispatch(usersRequest())
    try {
        const {data} = await youTrackService.get("admin/users?fields=id,login,name,email")
        dispatch(usersRequestSuccess(data))
    } catch (e) {
        console.log(e.message)
        dispatch(usersRequestFailed(e.message))
    }
}

export const getUserById = (id) => (state) => {
    return state.users.entities.find(user => user.id === id)
}

export const getUsers = () => (state) => {
    return state.users.entities
}

export const getUsersLoadingStatus = () => (state) => {
    return state.users.isLoading
}

export const getUsersDataStatus = () => (state) => {
    return state.users.dataLoaded
}

export default usersReducer