import {getAccessToken, getRefreshToken, removeAuthData, setTokens} from "./localStorageService";
import authService from "./authService";
import axios from "axios";
import history from "../utils/history"

const youTrack_Token = "perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL"

const http = axios.create()

http.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${youTrack_Token}`
            }
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

http.interceptors.request.use(
    async (resp) => {
        return resp
    }, async (e) => {
        if (e.response.status === "401") {
            const refresh_token = getRefreshToken()
            try {
                const data = await authService.refresh(refresh_token)
                setTokens(data)
            } catch (e) {
                history.push("/")
                removeAuthData()
            }
        }
        return Promise.reject(e)
    }
)

export const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}