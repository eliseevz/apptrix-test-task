import axios from "axios"

const apptrix = axios.create({
    baseURL: "http://erp.apptrix.ru/api/token/"
})

const apptrixService = {
    get: apptrix.get
}

export default apptrixService