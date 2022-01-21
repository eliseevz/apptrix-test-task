import axios from "axios"
import {httpService} from "./httpService";

const baseURL = "https://demo-apptrix.myjetbrains.com/youtrack/api/"

const youTrackService = {
    get: async (url, data) => await httpService.get(baseURL + url, data),
    post: async (url, data) => await httpService.post(baseURL + url, data),
}

export default youTrackService