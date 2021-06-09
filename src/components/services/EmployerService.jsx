import axios from "axios"

export default class EmployerService {

    getEmployers() {
        return axios.get("/api/employers/getAll")

    }

}