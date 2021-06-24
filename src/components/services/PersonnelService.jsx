import axios from "axios"

export default class PersonnelService {

    getPersonnels() {
        return axios.get("/api/personnel/getAll")

    }

    employerVerification(employerId, status){
        return axios.post("/api/personnel/employerVerification?employerId="+employerId+"&status="+status)
    }

}