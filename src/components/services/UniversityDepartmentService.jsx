import axios from "axios"

export default class UniversityDepartmentService {

    getUniversityDepartments() {
        return axios.get("/api/universityDepartment/getAll")

    }

}