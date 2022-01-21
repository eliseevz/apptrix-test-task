import apptrixService from "./apptrixService";

// http://erp.apptrix.ru/api/token/refresh/

const authService = {
    login: async (payload) => {
        const {data} = await apptrixService.post("api/token/", payload)
        return data
    },
    refresh: async (refresh) => {
        const {data} = await apptrixService.post("api/token/refresh/", refresh)
        return data
    }
}

export default authService