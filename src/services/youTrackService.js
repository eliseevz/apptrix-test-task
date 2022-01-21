import axios from "axios"

const youTrack = axios.create({
    baseURL: "https://demo-apptrix.myjetbrains.com/youtrack/api/"
})

const youTrackService = {
    get: youTrack.get
}

export default youTrackService