
import {httpService} from "./httpService";

const baseURL = "https://demo-apptrix.myjetbrains.com/youtrack/api/"

const youTrackService = {
    get: async (url, config) => await httpService.get(baseURL + url, config),
}

export default youTrackService