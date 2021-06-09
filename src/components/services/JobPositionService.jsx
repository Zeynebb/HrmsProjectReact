import axios from "axios"

export default class JobPositionService {

    getJobPositions() {
        return axios.get("/api/jobPosition/getAll")

    }

}