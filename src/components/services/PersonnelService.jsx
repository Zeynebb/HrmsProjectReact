import axios from "axios"

export default class PersonnelService {

    getPersonnels() {
        return axios.get("/api/personnel/getAll")

    }
    add(systemPersonnel){
        return axios.post("/api/personnel/register", systemPersonnel)
    }
    getByPersonnelId(personnelId){
        return axios.get("/api/personnel/getByUserId?userId="+personnelId)
    }

    employerVerification(employerId, status){
        return axios.post("/api/personnel/employerVerification?employerId="+employerId+"&status="+status)
    }

}