import axios from "axios"

export default class WorkTimeTypeService {

    getWorkTimeTypes() {
        return axios.get("/api/workTimeType/getAll")

    }
}
