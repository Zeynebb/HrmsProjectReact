import axios from "axios"

export default class WorkTypeService {

    getWorkTypes() {
        return axios.get("/api/workType/getAll")

    }
}
