import {httpService} from "./httpService";

const baseURL = "http://erp.apptrix.ru/"

const apptrixService = {
    post: async (url, data) => {
        const response = await httpService.post(baseURL+url, data)
        return response
    },
}

export default apptrixService