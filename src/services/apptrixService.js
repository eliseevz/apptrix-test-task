import axios from "axios"
import {httpService} from "./httpService";

const baseURL = "http://erp.apptrix.ru/"

// const apptrix = axios.create({
//     baseURL:
// })


const apptrixService = {
    get: async (url, data) => {
        const response = await httpService.get(baseURL+url, data)
        return response
    },
    post: async (url, data) => {
        const response = await httpService.post(baseURL+url, data)
        return response
    },
}

export default apptrixService