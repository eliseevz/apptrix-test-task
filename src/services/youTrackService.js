import axios from "axios"
import {httpService} from "./httpService";

const baseURL = "https://demo-apptrix.myjetbrains.com/youtrack/api/"

const youTrackService = {
    get: async (url, config) => await httpService.get(baseURL + url, config),
    post: async (url, data) => await httpService.post(baseURL + url, data),
}

export default youTrackService