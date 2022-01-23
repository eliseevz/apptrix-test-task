import {createSlice} from "@reduxjs/toolkit";
import youTrackService from "../services/youTrackService";
import {getUniqueListOfProjects} from "../utils/getUniqueListOfProjects";


const issueSlice = createSlice({
    name: "issues",
    initialState: {
        entities: [],
        isLoading: false,
        error: null,
        autoComplete: [],
        autoCompleteLoading: false,
        autoCompleteError: null,
    },
    reducers: {
        issueRequest: (state) => {
            state.isLoading = true
        },
        issueRequestSuccess: (state, action) => {
            state.entities =  [...action.payload]
            state.isLoading = false
        },
        issueRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        autoCompleteRequest: (state) => {
            state.autoCompleteLoading = true
        },
        autoCompleteRequestSuccess: (state, action) => {
            state.autoComplete = action.payload
            state.autoCompleteLoading = false
        },
        autoCompleteRequestFailed: (state, action) => {
            state.autoCompleteError = action.payload
            state.autoCompleteLoading = false
        },
        clearAutoCompleteData: (state) => {
            state.autoComplete = []
        }
    }
})


const {reducer: issueReducer, actions} = issueSlice
const {
    issueRequest,
    issueRequestSuccess,
    issueRequestFailed,
    autoCompleteRequest,
    autoCompleteRequestSuccess,
    autoCompleteRequestFailed,
    clearAutoCompleteData
} = actions


export const loadIssueList = () => async (dispatch) => {
    dispatch(issueRequest())
    try {
        const {data} = await youTrackService.get("issues?fields=id,summary,project(name)")
        dispatch(issueRequestSuccess(data))
    } catch (e) {
        dispatch(issueRequestFailed(e.message))
    }
}

export const loadAutoCompleteData = (search) => async (dispatch) => {
    dispatch(autoCompleteRequest())
    try {
        const {data} = await youTrackService.get(`issues?fields=id,summary,project(name)`, {
            params: {
                query: `name:${search}`
            }
        })
        const namesArray = getUniqueListOfProjects(data)
        const transformedArr = namesArray.map(name => ({label: name}))
        dispatch(autoCompleteRequestSuccess(transformedArr))

    } catch (e) {
        dispatch(autoCompleteRequestFailed(e.message))
    }
}

export const clearAutoComplete = () => (dispatch) => {
    dispatch(clearAutoCompleteData())
}

export const getIssuesData = () => (state) => {
    return state.issues.entities
}

export const getIssuesLoadingStatus = () => (state) => {
    return state.issues.isLoading
}

export const getAutocompleteData = () => (state) => {
    return state.issues.autoComplete
}



export default issueReducer